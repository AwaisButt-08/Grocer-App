import cookieParser from 'cookie-parser';
import  express from 'express';
import cors from 'cors'
import 'dotenv/config'
import connectDB from './Configs/DB.js';
import UserRouter from './Routes/UserRoute.js';
import SellerRouter from './Routes/SellerRoute.js'
import { connectCloudinary } from './Configs/cloudinary.js';
import ProductRouter from './Routes/ProductRouter.js'
import cartRouter from './Routes/CartRoute.js';
import addressRouter from './Routes/AddressRoute.js';
import orderRouter from './Routes/OrderRoute.js'
import { stripeWebhooks } from './Controllers/OrderController.js';



const app = express();

const port =  process.env.PORT || 4000;

await connectDB();
await connectCloudinary();

const allowedOrigins = ['http://localhost:5173']
app.post('/stripe',express.raw({type:'application/json'}),stripeWebhooks)
// MIDDLEWARE CONFIG
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: allowedOrigins, credentials:true}));

app.get('/', (req,res)=>res.send("API is working!"))

app.use('/api/user',UserRouter);
app.use('/api/seller',SellerRouter);
app.use('/api/product',ProductRouter);
app.use('/api/cart',cartRouter);
app.use('/api/address',addressRouter);
app.use('/api/order',orderRouter);

app.listen(port,()=>{
    console.log(`Server is running on https://localhost:${port}`);
});