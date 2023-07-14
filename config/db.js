import mongoose from "mongoose";
import { config as configDotenv } from "dotenv";

configDotenv();

const MONGODB_URI = process.env.MONGODB_URI;


const dbConfig = async() => {
  try{
    const conn = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology:true
    })
    if(conn){
      console.log('connected to db')
    }
  }catch(error){
    console.log(error)
  }
}

export default dbConfig