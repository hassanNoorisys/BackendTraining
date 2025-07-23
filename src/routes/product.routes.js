import { Router } from "express";
import { addProduct, deleteProduct, getProducts } from "../controllers/product.controller.js";
import imageUpload from "../middlewares/productImageUpload.js";
import verifyUser from "../middlewares/verifyUser.js";

const route = Router()

route.post('/add', verifyUser, imageUpload.single('productImage'), addProduct)

route.get('/', getProducts)

// route.get('/date', verifyUser, getProductByDate)
//     .get('/', verifyUser, getAllProducts)
//     .get('/:id', verifyUser, getProductById)

route.delete('/:id', verifyUser, deleteProduct)

export default route