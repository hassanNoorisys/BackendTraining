import { Router } from "express";
import { addProduct, deleteProduct, getAllProducts, getProductByDate, getProductById } from "../controllers/product.controller.js";
import imageUpload from "../middlewares/productImageUpload.js";
import verifyUser from "../middlewares/verifyUser.js";

const route = Router()

route.use(verifyUser)

route.post('/add', imageUpload.single('productImage'), addProduct)

route.get('/date', getProductByDate)
    .get('/', getAllProducts)
    .get('/:id', getProductById)

route.delete('/:id', deleteProduct)

export default route