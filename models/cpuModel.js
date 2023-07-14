import mongoose from "mongoose";

const cpuModel = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    cores:{
        type:String,
        required:true
    },
    threads:{
        type:String,
        required:true
    },
    socket_type:{
        type:String,
        required:true
    },
    ram_type:{
        type:[String],
        required:true
    },
    max_ram_freq:{
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

export default mongoose.model('CPU', cpuModel)
