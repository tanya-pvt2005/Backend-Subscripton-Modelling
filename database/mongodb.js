import mongoose  from "mongoose";
import {DB_URI, NODE_ENV} from "../config/env.js"

if(!DB_URI){
    throw new Error('Define MONGODB_URI environment variable inside .env.<production/developement>.local')
}

//if URI is present: connect to database online : using a function that would be called somewhere
const connectToDatabase = async() =>{
    try{
        await mongoose.connect(DB_URI)
        console.log(`Connected to database in ${NODE_ENV} mode`)
    }
    catch(error){
        console.log("Error connecting to db : ", error)
        process.exit(1)
    }
}

export default connectToDatabase