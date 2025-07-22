import express from 'express'

const app = express()

app.use(express.json())


import userRoute from './src/routes/usesr.routes.js'

app.use('/api/user', userRoute)


import errorHandler from './src/middlewares/errorHandler.js'
app.use(errorHandler)

export default app

