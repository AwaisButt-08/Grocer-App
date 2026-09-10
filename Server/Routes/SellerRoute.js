import express from "express";
import bcrypt from "bcryptjs";
import {
  sellerLogin,
  sellerlogout,
  isSellerAuth,
} from "../Controllers/SellerController.js";
import authSeller from "../Middlewares/authSeller.js";

const SellerRouter = express.Router();

SellerRouter.post("/login", sellerLogin);
SellerRouter.get("/is-auth", authSeller, isSellerAuth);
SellerRouter.post("/logout", sellerlogout);

export default SellerRouter;
