import {Router} from 'express'
import { getUser, getUsers } from '../controller/user.controller.js'
import authorize from '../middlewares/authorization.middleware.js'
import errorMiddleware from '../middlewares/error.middleware.js'
const userRouter = Router()

//WE DON'T WANT TO EXPOSE USER DATA TO NORMAL USERS VIA ROUTES : PROTECT IT: USING AUTHENTICATION MIDDLEWARE (auth.middleware.js)
//multiple routes with same endpoints but diff http verbs

//GET /users -> gets all users
//GET /users/:id -> gets user by id
userRouter.get('/', getUsers)

//getting one user
//chain as many middlewares as you want
userRouter.get('/:id', authorize, errorMiddleware, getUser)

userRouter.post('/',(req,res)=>{
    res.send({title:"New user created"})
})

userRouter.put('/:id',(req,res)=>{
    res.send({title:"User is updated by id"})
})

userRouter.delete('/:id',(req,res)=>{
    res.send({title: "Delete user by id"})
})

export default userRouter



