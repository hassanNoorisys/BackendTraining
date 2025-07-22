import prisma from "../../config/db.config.js"
import AppError from "../utils/AppError.js"

const addProductService = async (product) => {

    const {
        userEmail,
        productName,
        productCategory,
        price,
        productBrand,
        imgURL,
    } = product


    const newProduct = await prisma.product.create({
        data: {
            user: {

                connect: {
                    email: userEmail,
                },
            },

            productName,
            productCategory,
            price: Number(price),
            productBrand,
            imgURL,
        }
    })

    if (!newProduct) throw new AppError('Something went wrong', 500)
}

const getAllProductsService = async (userEmail) => {

    const products = await prisma.product.findMany({

        where: {

            userEmail
        }
    })

    if (products.length < 1) throw new AppError('Products not found', 404)

    return products
}

const getProductByIdService = async (productFilter) => {

    const { email, id } = productFilter

    const products = await prisma.product.findUnique({

        where: {

            userEmail: email,
            id: Number(id)
        }
    })

    if (!products) throw new AppError('Product not found', 404)

    return products
}

const getProductByDateService = async (productFilter) => {

    const { email, date } = productFilter

    const startDate = new Date(date);
    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);

    const products = await prisma.product.findMany({
        where: {

            userEmail: email,
            created_at: {

                gte: startDate,
                lte: endDate
            }
        }
    })

    if (!products || products.length == 0) throw new AppError('Products not found', 404)

    return products
}

const deleteProductService = async (productFilter) => {

    try {

        const product = await prisma.product.delete({

            where: {

                id: Number(productFilter)
            }
        })

        if (!product) throw new AppError('Product not found', 404)

        return product

    } catch (error) {
        if (error.code === 'P2025') {
          
            throw new AppError('Product not found', 404);
        }
    }
}
export {

    addProductService,
    getAllProductsService,
    getProductByIdService,
    getProductByDateService,
    deleteProductService
}