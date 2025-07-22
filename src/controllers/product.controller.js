import expressAsyncHandler from "express-async-handler"
import AppError from "../utils/AppError.js"
import { addProductService, deleteProductService, getAllProductsService, getProductByDateService, getProductByIdService } from "../services/product.services.js"

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


    const id = req.params.id

    const email = req.user

    if (!id) return next(new AppError('Id is mandatory', 400))

    const product = await getProductByIdService({ email, id })

    res.status(200).json({ message: 'Product found', product })
})

const getProductByDate = expressAsyncHandler(async (req, res, next) => {

    const email = req.user

    const date = req.query.date

    if (!date) return next(new AppError('date is required', 400))

    const products = await getProductByDateService({ email, date })

    res.status(200).json({ message: 'Product found', products })
})

const deleteProduct = expressAsyncHandler(async (req, res, next) => {

    const id = req.params.id

    if (!id) return next(new AppError('Id is mandatory', 400))

    const product = await deleteProductService(id)

    res.status(200).json({ message: 'Product deleted successfully', product })

})

export {
    addProduct,
    getAllProducts,
    getProductByDate,
    getProductById,
    deleteProduct
}