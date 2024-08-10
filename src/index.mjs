import express from "express";
import routes from './routes/index.mjs'
import cookieParser, { signedCookie } from "cookie-parser";

const app = express()

app.use(express.json())
app.use(routes)
app.use(cookieParser("helloworld"))

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>(
    console.log(`Running at port ${PORT}`)
))

app.get("/",(req,res)=>{
    res.cookie("hello", "world", {maxAge: 30000, signedCookie : true})
    res.status(201).send({msg:"Hello"})
})