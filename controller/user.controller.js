import User from "../models/user.model.js";

//to get all users
export const getUsers = async(req , res, next)=>{
    try{

        const users = await User.find()
        res.status(200).json({
            success:true,
            data:users
        })

    }catch(error){
        next(error)
    }
}

//to get a user

export const getUser = async(req , res, next)=>{
    try{

        //get req : also pass data through req.params.body
        
        const user = await User.findById(req.params.id).select('-password') //give user info except the password
        if(!user){
            const error= new Error('User not found')
            error.statusCode = 404
            throw error
        }
        res.status(200).json({
            success:true,
            data:user
        })

    }catch(error){
        next(error)
    }
}