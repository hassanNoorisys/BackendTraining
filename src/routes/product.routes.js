import { Router } from "express";
import { addProduct, deleteProduct, getAllProducts, getProductByDate, getProductById } from "../controllers/product.controller.js";
import imageUpload from "../middlewares/productImageUpload.js";
import verifyUser from "../middlewares/verifyUser.js";

const route = Router()

route.post('/add', verifyUser, imageUpload.single('productImage'), addProduct)

route.get('/:id', getProductById)
    .get('/date', getProductByDate)
    .get('/', getAllProducts)


route.delete('/:id', deleteProduct)

export default route