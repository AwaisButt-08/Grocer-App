import express from 'express'

import authUser from '../Middlewares/authUser.js';
import { getAddress,addAddress } from '../Controllers/AddressController.js';
import { Router } from 'express';

const addressRouter = Router();

addressRouter.post('/add',authUser,addAddress )
addressRouter.get('/get',authUser,getAddress )
 
export default addressRouter
