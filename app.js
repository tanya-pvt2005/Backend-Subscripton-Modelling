import express from 'express'
import {PORT} from './config/env.js'

import userRouter from './routes/user.routes.js'
import authRouter from './routes/auth.routes.js'
import subRouter from './routes/subscription.routes.js'
import connectToDatabase from './database/mongodb.js'
import errorMiddleware from './middlewares/error.middleware.js'
import cookieParser from 'cookie-parser'

const app = express()

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())

//after importing routers, put them to use; use is not only used with middlewares
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/subscriptions', subRouter)

//custom middleware : global error handling
app.use(errorMiddleware)

//auth : authentication

app.get('/',(req,res)=>{
    res.send("Welcome to the subscription tracker API!")
})

app.listen(PORT, async ()=>{
    console.log(`Subscription tracketr API is running on http://localhost:${PORT} `)
    await connectToDatabase()
})

export default app;