import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import setSession from "./middlewares/sessionMiddleware.js";
import router from "./routes/route.js";
import dbConfig from "./config/db.js";
const app = express();
const PORT = 3000;


const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};
// Middleware
app.use(express.json());
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(setSession())
app.use('/api',router)



app.listen(PORT, () => {
  console.log(`server is connected to ${PORT}`)
})

dbConfig()