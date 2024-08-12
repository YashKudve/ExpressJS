import express from "express";
import routes from './routes/index.mjs'
import cookieParser from "cookie-parser";
import session from 'express-session'
import { mockUsers } from "./utils/constants.mjs";

const app = express()

app.use(express.json())
app.use(cookieParser("helloworld"))
app.use(session({
    secret:"Yash",
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge: 60000*60,
    }
}))
app.use(routes)

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>(
    console.log(`Running at port ${PORT}`)
))

app.get("/",(req,res)=>{
    console.log(req.session);
    console.log(req.session.id);
    req.session.visited = true;
    res.cookie("hello", "world", {maxAge: 30000, signedCookie : true})
    res.status(201).send({msg:"Hello"})
})

app.post("/api/auth", (req,res)=>{
    const {body:{username, password}} = req;
    const findUser = mockUsers.find((user)=>user.username === username)

    if(!findUser || findUser.password !== password) 
        return res.status(401).send({msg:"Bad Credentials"});

    req.session.user = findUser;
    return res.status(200).send(findUser)
})

app.get('/api/auth/status', (req,res)=>{
    return req.session.user ? res.status(200).send(req.session.user) : res.status(401).send({msg:"Not authenticated"})
})