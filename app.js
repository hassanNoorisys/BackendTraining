import express from 'express'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));



import userRoute from './src/routes/usesr.routes.js'
import productRoute from './src/routes/product.routes.js'

app.use('/api/user', userRoute)
app.use('/api/product', productRoute)


import errorHandler from './src/middlewares/errorHandler.js'
app.use(errorHandler)

export default app

