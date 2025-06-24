import express from "express"
import z from "zod"
import { config } from "dotenv"
import mongoose from "mongoose";
import Message from "./models/ProductModel.js"
config();
async function connectDatabase(params) {
    try{
    const conn = await mongoose.connect(process.env.URL_database, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(conn)
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    }catch(error){
        console.log(error);
        process.exit(1);
    }
    
}
connectDatabase();
const app=express()

app.use(express.json())

app.get("/",(req,res)=>{
    res.json("welcome")
})
const messageschema=z.object({
    message:z.string().min(3).max(150),
})
const messages=[];
app.get("/message",(req,res)=>{
    console.log(process.env.URL_database)
res.status(200).send(messages);
})

app.post("/message",async(req,res)=>{
    const message=req.body.message;
    //validation we have to do
    const validateMessage=messageschema.safeParse({message:req.body.message})
    console.log(validateMessage?.error);
    messages.push(message);
    const messageStored=await Message.create({message})
    console.log(messageStored)
    res.status(200).json({response:"successfull"})
})

app.listen(process.env.PORT,()=>{
    console.log(`listing ${process.env.PORT}`);
})