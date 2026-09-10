import Order from '../Models/Order.js';
import Product from '../Models/Product.js'
import stripe from 'stripe'
import User from '../Models/User.js'
//placeOrderCOD  /api/order/cod
export const placeOrderCOD = async (req,res)=>{
    try {
        const {userId,items,address} = req.body;
        if(!address || items.length===0 ){
            return res.json({success: false, message: 'Invalid Data'} );
        }

        //Calculate amount using items
        let amount = await items.reduce(async (acc,item)=>{
            const product =  await Product.findById(item.product)
            return (await acc) + product.offerPrice * item.quantity;
        },0)

        //ADD tax charge
        amount += Math.floor(amount * 0.02);

        await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType:"COD",

        })
         res.json({ success: true, message:" Order placed successfully!  "  });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

//PLACEORDERSTRIPE  '/api/order/stripe'
export const placeOrderStripe = async (req,res)=>{
    try {
        const {userId,items,address} = req.body;
        const {origin} = req.headers;
        if(!address || items.length===0 ){
            return res.json({success: false, message: 'Invalid Data'} );
        }
        let productData = [];

        //Calculate amount using items
        let amount = await items.reduce(async (acc,item)=>{
            const product =  await Product.findById(item.product);
            productData.push({
                name:product.name,
                price:product.offerPrice,
                quantity: item.quantity,
            });
            return (await acc) + product.offerPrice * item.quantity;
        },0)

        //ADD tax charge
        amount += Math.floor(amount * 0.02);

        const order = await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType:"Online",

        });

        //STRIPE GATEWAY
        const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

        //Create line items fro stripe
        const line_items= productData.map((item)=>{
            return{
                price_data:{
                    currency:"usd",
                    product_data:{
                        name:item.name,
                    },
                    unit_amount: Math.floor(item.price + item.price * 0.02) * 100
                },
                quantity: item.quantity,
            }
        });

        const session = await stripeInstance.checkout.sessions.create({
            line_items,
            mode:'payment',
            success_url:`${origin}/loader?next=my-orders`,
            cancel_url:`${origin}/cart`,
            metadata:{
                orderId:order._id.toString(),
                userId,
            }
        })


         res.json({ success: true,url: session.url  }); //message:" Order placed successfully!  " 
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// STRIPE WWEBHOOK 
export const stripeWebhooks = async(req,res)=>{
     //STRIPE GATEWAY
    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

    const sig = req.headers["stripe-signature"];
    let event;
    try {
        event = stripeInstance.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (error) {
        return res.status(400).send(`Webhook Error:${error.message}`)
    }

    //HANDLE WEBHOOK EVENT

    switch(event.type){
        case "payment_intent.succeeded":{
            const paymentIntent = event.data.object;
            const paymentIntentId = paymentIntent.id;

            //GETTING SESSION METADATA

            const session = await stripeInstance.checkout.sessions.list({
                payment_intent:paymentIntentId,
            })

            const {orderId,userId} = session.data[0].metadata;
            await Order.findByIdAndUpdate(orderId,{isPaid:true})
            await User.findByIdAndUpdate(userId,{cartItems:{}})

             break;
        }
        case "payment_intent.payment_failed":{
            const paymentIntent = event.data.object;
            const paymentIntentId = paymentIntent.id;

            //GETTING SESSION METADATA

            const session = await stripeInstance.checkout.sessions.list({
                payment_intent:paymentIntentId,
            })

            const {orderId} = session.data[0].metadata;
            await Order.findByIdAndDelete(orderId)
            break;
        }
         

        default:
            console.error(`Unhandled event type${event.type}`)
            break;
    }
    res.json({recieved:true})
};
//GET ORDER BY USERID '/api/order/user'
export const getUserOrders = async (req,res)=>{
    try {
        // const {userId} = req.body;
        const orders =  await Order.find({
            userId: req.userId,
            $or:[{paymentType:"COD"},{ isPaid: true}]
        }).populate("items.product address").sort({createdAt:-1});
        res.json({ success: true,orders });
    } catch (error) {
      res.json({ success: false, message: error.message });   
    }
};

'/api/order/seller'
export const getAllOrders = async (req,res)=>{
    try {
        const orders =  await Order.find({
            $or:[{paymentType:"COD"},{ isPaid: true}]
        }).populate("items.product address").sort({createdAt:-1});
        res.json({ success: true,orders });
    } catch (error) {
      res.json({ success: false, message: error.message });   
    }
};