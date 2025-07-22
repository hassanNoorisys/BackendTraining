import { loginUserService, registerUserService } from "../services/user.sesrvice.js"
import expressAsyncHandler from "express-async-handler"
import AppError from "../utils/AppError.js"

const registerUser = expressAsyncHandler(async (req, res, next) => {

    const { name, email, password } = req.body

    if (!name || !email || !password) throw new AppError('All Fields are mandatory', 400)

    const user = await registerUserService(req.body)

    res.status(201).json({ message: 'User created' })
})

const loginUser = expressAsyncHandler(async (req, res, next) => {

    const { email, password } = req.body

    if (!email || !password) throw new AppError('All Fields are mandatory', 400)

    const { token } = await loginUserService(req.body)

    res.status(200).json({ message: 'Logged in', token })
})

export {

    registerUser,
    loginUser
}