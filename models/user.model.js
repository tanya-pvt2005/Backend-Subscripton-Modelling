import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type : String,
        required : [true, "User name is required"],
        trim : true,
        minLength : 2,
        maxLength :50
    },
    email:{
        type : String,
        required : [true, "User mail id is required"],
        trim : true,
        lowercase : true,
        unique : true,
        minLength : 5,
        maxLength :255,
        // match : [ .................., "Please fill a valid email id"]
    },
    password:{
        type : String,
        required:[true, 'user pswd req'],
        minLength:6
    }
},{Timestamp : true} )

const User = mongoose.model('User', userSchema )

export default User