import expressAsyncHandler from "express-async-handler"
import AppError from "../utils/AppError.js"
import { addProductService, deleteProductService, getProductsService } from "../services/product.services.js"

const addProduct = expressAsyncHandler(async (req, res, next) => {

    const { productName, productCategory, price, productBrand } = req.body

    if (!productName || !productCategory || !price || !productBrand) return next(new AppError('All Fields are Mandatory', 400))

    if (!req.file) return next(new AppError('Image is required', 400))

    const imgURL = req.file.filename
    const newProduct = await addProductService({ ...req.body, imgURL, id: req.user })

    res.status(201).json({ message: 'Product Added succesfully', data: newProduct })
})

const getProducts = expressAsyncHandler(async (req, res, next) => {

    const filter = req.query
    const page = req.query.page
    const size = req.query.size

    const products = await getProductsService(filter, { page, size })

    res.status(200).json({ message: 'Products found', data: products })
})

const deleteProduct = expressAsyncHandler(async (req, res, next) => {

    const id = req.params.id

    if (!id) return next(new AppError('Id is mandatory', 400))

    const product = await deleteProductService(id)

    res.status(200).json({ message: 'Product deleted successfully', data: product })

})

export {
    addProduct,

    getProducts,

    // getAllProducts,
    // getProductByDate,
    // getProductById,
    
    deleteProduct
}