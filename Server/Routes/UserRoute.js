import express, { Router } from 'express'
import bcrypt from 'bcryptjs'
import {login, logout, Register,isAuth}   from '../Controllers/UserController.js';
import authUser from '../Middlewares/authUser.js'

const UserRouter= express.Router();

UserRouter.post('/register', Register)
UserRouter.post('/login', login)
UserRouter.get('/is-auth',authUser, isAuth)
UserRouter.get('/logout',authUser, logout)


export default UserRouter
