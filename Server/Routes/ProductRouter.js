import  express from 'express';
import  {upload} from '../Configs/multer.js'
import authSeller from '../Middlewares/authSeller.js';
import  {addProduct, productList,  ProductById,  changeStock } from '../Controllers/ProductController.js'

const ProductRouter = express.Router();
  ProductRouter.post('/add', upload.array("images"),authSeller,addProduct) //Changed [] braces to '' images
  ProductRouter.get('/list', productList)
  ProductRouter.get('/id', ProductById)
  ProductRouter.post('/stock',authSeller,changeStock )

export default ProductRouter
