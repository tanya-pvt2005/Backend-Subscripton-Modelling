import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import User from "../models/user.model.js"
import  jwt  from "jsonwebtoken"
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js"
//req.body?  object containing data coming from client (Especially in post request)

export const signUp = async (req, res, next) => {

    //not a user session, session of a mongoose transaction
    const session =  await mongoose.startSession();
    session.startTransaction() //Atomic operations : DO ALL OR NOTHING

    try{
        //Create a new user

        //backend api gets data from req.body : object containing data coming from client (esp POST)
        //destructure data from req.body
        const {name, email, password} = req.body

        //check if user exists
        const existingUser = await User.findOne({email})
        if(existingUser){
            const error = new Error('User already exists')
            error.statusCode = 409
            throw error
        }

        //if it doesn't exist hash password
        const salt = await bcrypt.genSalt(10)
        const hashPassword =  await bcrypt.hash(password, salt)

        const newUsers = await User.create([{name, email, password: hashPassword}], {session}) //if something goes wrong : session

        //generating token for user to sign in
        const token = jwt.sign({userId: newUsers[0]._id}, JWT_SECRET, {expiresIn : JWT_EXPIRES_IN})
        await session.commitTransaction()
        session.endSession

        res.status(201).json({
            success:true,
            message:'User created successfully',
            data:{
                token,
                user : newUsers[0]
            }
        })

    }catch(error){
        await session.abortTransaction()
        session.endSession()
        next(error)
    }

}

export const signIn = async (req, res, next) => {
    try{

        const {email, password} = req.body;
        //check if exists
        const user = await User.findOne({email})
        //if doesn't exist
        if(!user){
            const error = new Error('User not found')
            error.statusCode = 404
            throw error
        }

        //if exists: check password
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid){
            const error = new Error('Invalid Password')
            error.statusCode = 401
            throw error
        }

        //generate token
        const token = jwt.sign({userId: user._id}, JWT_SECRET, {expiresIn : JWT_EXPIRES_IN})

        res.status(200).json({
            success: true,
            message: 'User signed in successfully',
            data:{
                token,
                user,        
            }
        })

    }catch(error){

        //passes error to error handling middleware by skipping others
        next(error)
    }
}

export const signOut = async (req, res, next) => {

}