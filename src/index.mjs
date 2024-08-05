import express from 'express'

const app = express()

const PORT = process.env.PORT || 3000;

const mockUsers = [
    {id: 1, username:'yash', displayName: 'YASH',age:21},
    {id: 2, username:'chandan', displayName: 'CHANDAN',age:20},
    {id: 3, username:'ameya', displayName: 'AMEYA',age:26},
    {id: 4, username:'aniket', displayName: 'ANIKET',age:19},
    {id: 5, username:'shivam', displayName: 'SHIVAM',age:20},
    {id: 6, username:'shubham', displayName: 'SHUBHAM',age:22},
    {id: 7, username:'ashish', displayName: 'ASHISH',age:23},

]

// app.get('/', (req,res)=>{
//     res.sendStatus(501).send(`Hello`);
//     // res.send('Hello world')
// })

// app.get("/api/users", (req,res)=>{
//     res.send(mockUsers)
// })
app.get("/api/users", (req,res)=>{
    console.log(req.query);
    // res.send(mockUsers)
})

app.get("/api/users/:id", (req,res)=>{
    // console.log(req.params);
    const parsedId = parseInt(req.params.id)    
    console.log(parsedId);

    if (isNaN(parsedId)) {
        return res.status(400).send(`Bad Request:: Invalid ID`)
    } 

    const findUser = mockUsers.find((user)=>user.id === parsedId)

    if(!findUser) return res.send(`User not found`);

    return res.send(findUser)
    
})
 
app.listen(PORT,()=>{
    console.log(`Running on Port ${PORT}`)
})