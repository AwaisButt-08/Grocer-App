
import authUser from '../Middlewares/authUser.js';
import { getUserOrders,getAllOrders,placeOrderCOD, placeOrderStripe } from '../Controllers/OrderController.js';
import { Router } from 'express';
import authSeller from '../Middlewares/authSeller.js';

const orderRouter = Router();

orderRouter.post('/cod',authUser,placeOrderCOD)
orderRouter.get('/user',authUser,getUserOrders )
orderRouter.get('/seller',authSeller,getAllOrders )
orderRouter.post('/stripe',authUser,placeOrderStripe)
 
export default orderRouter
