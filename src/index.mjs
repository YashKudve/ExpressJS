import express from "express";
import routes from './routes/index.mjs'
import cookieParser from "cookie-parser";
import session from 'express-session'
import { mockUsers } from "./utils/constants.mjs";
import passport from "passport"
import mongoose from "mongoose";
import "./strategies/localStrategy.mjs"
import MongoStore from "connect-mongo";

const app = express()

mongoose.connect("mongodb://localhost:27017/express_js").then(()=>console.log("Connected to Database")).catch((error)=>console.log(`Error: ${error}`))

app.use(express.json())
app.use(cookieParser("helloworld"))
app.use(session({
    secret:"Yash",
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge: 60000*60,
    },
    store:MongoStore.create({
        client:mongoose.connection.getClient()
    })
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(routes)

app.post("/api/auth", passport.authenticate("local"), (req,res)=>{
    res.sendStatus(200);
})

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
    req.sessionStore.get(req.sessionID,(err, session)=>{
        console.log(session)
    })
    return req.session.user ? res.status(200).send(req.session.user) : res.status(401).send({msg:"Not authenticated"})
})

app.post("/api/cart", (req,res)=>{
    if(!req.session.user) return res.sendStatus(401);

    const {body:item} = req;
    const {cart} = req.session;

    if(cart){
        cart.push(item);
    } else{
        req.session.cart = [item];
    }

    return res.status(201).send(item)
})

app.get("/api/cart", (req,res)=>{
    if(!req.session.user) return res.sendStatus(401);
    return res.send(req.session.cart ?? [])
})