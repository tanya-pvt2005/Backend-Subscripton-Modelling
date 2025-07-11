import {Router} from 'express'

const subRouter = Router()

subRouter.get('/',(req,res)=>{
    res.send({title : "GET all subscription"})
})

subRouter.get('/:id',(req,res)=>{
    res.send({title : "GET one subscription"})
})

subRouter.post('/',(req,res)=>{
    res.send({title : "Create a subscription"})
})

subRouter.put('/:id',(req,res)=>{
    res.send({title : "UPDATE a subscription"})
})

subRouter.delete('/:id',(req,res)=>{
    res.send({title : "DELETE a subscription"})
})


//for a particular user
subRouter.get('/user/:id',(req,res)=>{
    res.send({title : "GET a user subscription"})
})

subRouter.put('/:id/cancel',(req,res)=>{
    res.send({title : "CANCEL subscription"})
})

subRouter.get('/upcoming-renewals',(req,res)=>{
    res.send({title : "GET upcoming renewals"})
})

export default subRouter;