import express from "express";
import userRouter from './routes/user.mjs'
import productsRouter from './routes/products.mjs'

const app = express()

app.use(express.json())
app.use(userRouter)
app.use(productsRouter)

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>(
    console.log(`Running at port ${PORT}`)
))

app.get('/',(req,res)=>(
    res.status(201).send({msg:"Hello"})
))