import express from 'express'

const app = express()

const PORT = process.env.PORT || 3000;

// app.get('/', (req,res)=>{
//     res.sendStatus(501).send(`Hello`);
//     // res.send('Hello world')
// })

app.get("/api/users", (req,res)=>{
    res.send([
        {id: 1, username:'User1', age:21},
        {id: 2, username:'User22', age:23},
        {id: 3, username:'User333', age:22},
    ])
})
 
app.listen(PORT,()=>{
    console.log(`Running on Port ${PORT}`)
})