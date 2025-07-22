import express from 'express'
import errorHandler from './src/middlewares/errorHandler.js'

const app = express()

app.use(express.json())
app.use(errorHandler)

import userRoute from './src/routes/usesr.routes.js'

app.use('/api/user', userRoute)

export default app

