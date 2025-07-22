import catchAsync from "../utils/catchAsync.js"
import { registerUserService } from "../services/user.sesrvice.js"

const registerUser = catchAsync(async (req, res, next) => {

    const user = await registerUserService(req.body)

    res.status(201).json({message: 'User created'})
})




export {

    registerUser
}