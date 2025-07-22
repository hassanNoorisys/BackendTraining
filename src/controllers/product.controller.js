import expressAsyncHandler from "express-async-handler"
import AppError from "../utils/AppError.js"
import { addProductService, getAllProductsService } from "../services/product.services.js"

const addProduct = expressAsyncHandler(async (req, res, next) => {

    const { productName, productCategory, price, productBrand } = req.body

    if (!productName || !productCategory || !price || !productBrand) return next(new AppError('All Fields are Mandatory', 400))

    if (!req.file) return next(new AppError('Image is required', 400))

    const imgURL = req.file.filename
    const product = addProductService({ ...req.body, imgURL, userEmail: req.user })

    res.status(201).json({ message: 'Product Added succesfully' })
})

const getAllProducts = expressAsyncHandler(async (req, res, next) => {


    const email = req.user

    const products = await getAllProductsService(email)

    res.status(200).json({ message: 'Products found', products })
})

const getProductById = expressAsyncHandler(async (req, res, next) => {


})

const getProductByDate = expressAsyncHandler(async (req, res, next) => {


})

const deleteProduct = expressAsyncHandler(async (req, res, next) => {


})

export {
    addProduct,
    getAllProducts,
    getProductByDate,
    getProductById,
    deleteProduct
}