import User from '../Models/User.js  '
import jwt from 'jsonwebtoken'
// SELLER LOGIN /api/seller/login
export const sellerLogin = async (req,res)=>{
    try {
         const { email, password } = req.body;

    if(password === process.env.SELLER_PASSWORD && email === process.env.SELLER_EMAIL ){
        const token = jwt.sign({ email}, process.env.JWT_SECRET, {
              expiresIn: "7d",
            });
        
            res.cookie('sellerToken', token, {
              httpOnly: true, //prevent JS to access cookie
              secure: process.env.NODE_ENV === "production", //USe secure cookie in production
        
              sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", //For CSRF protection
              maxAge: 7 * 24 * 60 * 60 * 1000,
            });
         return res.json({
      success: true,message:'User Logged In!'
    });
    }else{
        return res.json({ success: false, message: "Invalid email or password" });
    }
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
   
};

export const isSellerAuth = async(req,res)=>{
  try {
    // const {userId} = req.body;  //body
    // const user = await User.findById(userId).select("-password")
    return  res.json({success:true});
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// SIGN OUT API 'api/seller/logout'

export const sellerlogout = async(req,res)=>{
  try {
    res.clearCookie('sellerToken',{
    httpOnly: true, //prevent JS to access cookie
    secure: process.env.NODE_ENV === "production", //USe secure cookie in production

    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
  });
  return res.json({success:true , message:'Logged Out!'})
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
  
};