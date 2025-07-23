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

// const getAllProducts = expressAsyncHandler(async (req, res, next) => {


//     const email = req.user

//     const products = await getAllProductsService(email)

//     res.status(200).json({ message: 'Products found', data: products })
// })

const getProducts = expressAsyncHandler(async (req, res, next) => {

    const filter = req.query
    const pageNumber = req.query.page
    const pageSize = req.query.size

    let query = {}

    if (filter.id) query.id = filter.id

    if (filter.name) query.productName = filter.name

    if (filter.brand) query.productBrand = filter.brand

    if (filter.date) {

        const startDate = new Date(filter.date)
        const endDate = new Date(filter.date)
        endDate.setHours(23, 59, 59, 999)

        query.created_at = {

            gte: startDate,
            lte: endDate
        }
    }

    const products = await getProductsService(query, { pageNumber, pageSize })

    res.status(200).json({ message: 'Products found', data: products })
})

// const getProductById = expressAsyncHandler(async (req, res, next) => {


//     const id = req.params.id

//     const email = req.user

//     if (!id) return next(new AppError('Id is mandatory', 400))

//     const product = await getProductByIdService({ email, id })

//     res.status(200).json({ message: 'Product found', product })
// })

// const getProductByDate = expressAsyncHandler(async (req, res, next) => {

//     const email = req.user

//     const date = req.query.date

//     if (!date) return next(new AppError('date is required', 400))

//     const products = await getProductByDateService({ email, date })

//     res.status(200).json({ message: 'Product found', products })
// })

const deleteProduct = expressAsyncHandler(async (req, res, next) => {

    const id = req.params.id

    if (!id) return next(new AppError('Id is mandatory', 400))

    const product = await deleteProductService(id)

    res.status(200).json({ message: 'Product deleted successfully', product })

})

export {
    addProduct,

    getProducts,

    // getAllProducts,
    // getProductByDate,
    // getProductById,
    deleteProduct
}