import mongoose from "mongoose";

// Declare the Schema of the Mongo model
const motherboardModel = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    socket_type:{
        type:String,
        required:true
    },
    pcie_x16:{
        type:Boolean,
        required:true
    },
    ram_type:{
        type:String,
        required:true,
    },
    max_ram_freq:{
      type:String,
      required:true,
    },
    ram_channel:{
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
      required:true
    }
});

export default mongoose.model('Motherboard', motherboardModel)