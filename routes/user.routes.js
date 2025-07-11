import {Router} from 'express'

const userRouter = Router()

//multiple routes with same endpoints but diff http verbs

//GET /users -> gets all users
//GET /users/:id -> gets user by id
userRouter.get('/',(req,res)=>{
    res.send({title : "GET all users"})
})

//getting one user
userRouter.get('/:id',(req,res)=>{
    res.send({title : "GET a use rdetails "})
})

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



