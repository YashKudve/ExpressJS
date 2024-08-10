import express from "express";
import routes from './routes/index.mjs'
import cookieParser from "cookie-parser";

const app = express()

app.use(express.json())
app.use(routes)
app.use(cookieParser())

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>(
    console.log(`Running at port ${PORT}`)
))

app.get("/",(req,res)=>{
    res.cookie("hello", "world", {maxAge: 60000 * 60 * 2})
    res.status(201).send({msg:"Hello"})
})