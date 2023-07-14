import mongoose from "mongoose";

const memoryModel = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    ram_type:{
        type:String,
        required:true
    },
    ram_freq:{
        type:String,
        required:true
    },
    capacity:{
        type:String,
        required:true
    },
    wattage:{
        type:String,
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

export default mongoose.model('Memory', memoryModel)