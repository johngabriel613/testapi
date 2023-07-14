import mongoose from "mongoose";

const gpuModel = new mongoose.Schema({
    name:{
      type:String,
      required:true
    },
    pcie_x16:{
      type:Boolean,
      required:true
    },
    type:{
      type:String,
      required:true
    },
    memory_size:{
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

export default mongoose.model('GPU', gpuModel)