import AppError from "../utils/AppError.js"
import prisma from '../../config/db.config.js'
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'

const registerUserService = async (userData) => {

    const { name, email, password } = userData

    const user = await prisma.user.findUnique({

        where: {
            email
        }
    })

    if (user) {

        throw new AppError('User Already Registered', 400)
    }

    const hashPassword = await bcrypt.hash(password, 10)

    const newUser = await prisma.user.create({
        data: {

            name,
            email,
            password: hashPassword
        }
    })
    return newUser
}

const loginUserService = async (userData) => {

    const { email, password } = userData

    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if (!user) {

        throw new AppError('User not present', 404)
    }

    const valid = bcrypt.compare(password, user.password)

    if (!valid) {
        throw new AppError('Invalid Credentals', 402)
    }

    const SECRET_KEY = process.env.SECRET_KEY
    const token = jwt.sign(user.email, SECRET_KEY)

    return { token }
}


export {

    registerUserService,
    loginUserService
}