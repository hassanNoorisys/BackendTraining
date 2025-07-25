import prisma from "../../config/db.config.js"
import AppError from "../utils/AppError.js"
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from "url";

const addProductService = async (product) => {

    const {
        id,
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
                    id
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

    return newProduct
}

const deleteProductService = async (productFilter) => {

    try {

        const product = await prisma.product.delete({

            where: {

                id: Number(productFilter)
            }
        })

        if (!product) throw new AppError('Product not found', 404)

        console.log(product)


        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);

        const productPath = path.join(__dirname, '../productImages/', product.imgURL)
        await fs.unlink(productPath)

        return product

    } catch (error) {
        if (error.code === 'P2025') {

            throw new AppError('Product not found', 404);
        }
    }
}

const getProductsService = async (filter, pageFilter) => {

    const { page, size } = pageFilter

    let query = {}
    if (filter.date) {

        const startDate = new Date(filter.date)
        const endDate = new Date(filter.date)
        endDate.setHours(23, 59, 59, 999)

        query.created_at = {

            gte: startDate,
            lte: endDate
        }
    }

    const products = await prisma.product.findMany({

        where: {

            ...(filter.id && { id: filter.id }),
            ...(filter.name && { name: filter.name }),
            ...(filter.date && { created_at: query.created_at })
        },

        skip: parseInt((page - 1) * size) || 0,
        take: parseInt(size) || 5,
        omit: {
            userId: true,
            created_at: true
        }
    })

    if (!products || products.length < 1) throw new AppError('Product not found', 404)

    return products
}

export {

    addProductService,
    getProductsService,
    deleteProductService
}