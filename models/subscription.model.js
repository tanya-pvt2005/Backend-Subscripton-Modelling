import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name:{
        type : String,
        required : [true, "Subscription name is required"],
        trim : true,
        minLength : 2,
        maxLength :100
    },
    price:{
        type : Number,
        required : [true, "Sub price is required"],
        minLength:[0, "Price must be greater than 0"]
    },
    currency:{
        type : String,
        enum:['INR', 'USD', 'EUR'],
        default: 'INR'
    },
    frequency:{
        type : String,
        enum:['daily','weekly','monthly','yearly'],
    },
    category:{
        type : String,
        enum:['sports', 'entertainment', 'news', 'lifestyle'],
        required : true
    },
    paymentMethod:{
        type : String,
        required:true,
        trim:true
    },
    status:{
        type : String,
        enum:['active', 'cancelled', 'expired'],
        default: 'active'
    },
    startDate:{
        type : Date,
        required:true,
        validate:{
            validator:(value)=>value <= new Date(),
            message : "Start date must be in the past"
        }
        
    },
     RenewalDate:{
        type : Date,
        validate:{
            validator: function(value){
                return value > this.startDate
            },
            message : "Start date must be in the past"
        }
    },
    User:{
        // referencing to other models
        type : mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
        index:true
    }
},{Timestamp : true} )

//function to automatically calculate renewal dates
subscriptionSchema.pre('save', function(next){

    //auto calculate renewal date if missing
    if(!this.RenewalDate){
        const renewalPeriods = {
            daily : 1,
            weekly : 7,
            monthly : 30,
            yearly : 365
        };

        this.renewalDate = new Date(this.startDate)
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
    }

    //Auto update the status if renewal date has passed
    if(this.renewalDate < new Date()){
        this.status = 'expired'
    }

    next()
})

const Subscription = mongoose.model('Subscription', subscriptionSchema)

export default Subscription