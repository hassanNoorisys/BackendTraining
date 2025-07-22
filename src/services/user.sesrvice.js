import AppError from "../utils/AppError.js"
import prisma from '../../config/db.config.js'

const registerUserService = async (userData) => {

    const { name, email, password } = userData

    // console.log(userData)

    const user = await prisma.user.create({
        data: {

            name,
            email,
            password

        }
    })

    console.log('register user --> ', user)
    // throw new AppError('Email already exists', 400);
    // if (user) {
    // }

}

const loginUserService = async (userData) => {


}


export {

    registerUserService,
    loginUserService
}