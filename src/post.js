import express from "express";

const app = express()

app.use(express.json()) //middleware

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

app.post('/api/users', (req, res)=>{
    console.log(req.body);

    const {body} = req;

    const newUser = {id: mockUsers[mockUsers.length - 1].id + 1, ...body}
    mockUsers.push(newUser)
    return res.status(201).send(mockUsers)

    
})

app.listen(PORT,()=>{
    console.log(`Running on Port ${PORT}`)
})