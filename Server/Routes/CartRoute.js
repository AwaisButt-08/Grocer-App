import mongoose from 'mongoose'
import authUser from '../Middlewares/authUser.js';
import { updateCart } from '../Controllers/CartController.js';
import { Router } from 'express';

const cartRouter = Router();

cartRouter.post('/update',authUser,updateCart )
 
export default cartRouter
