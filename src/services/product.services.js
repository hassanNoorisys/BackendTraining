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


export {

    addProductService,
    getAllProductsService
}