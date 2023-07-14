import mongoose from "mongoose";

const psuModel = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    output:{
        type:Number,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    imageSrc:{
        type:String,
        required:true,
    }
});

export default mongoose.model('PSU', psuModel)
