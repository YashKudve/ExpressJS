import express from 'express'
const app = express()

const PORT = process.env.PORT || 3000;

const loggingMiddleware = (req, res, next) =>{
    console.log(`${req.method}: ${req.url}`);
    next()
}

// app.use(loggingMiddleware)

const resolveIndexByUserId = (req,res,next) =>{
    const {body, params:{id}} = req;

    const parsedId = parseInt(id);
    if(isNaN(parsedId)) res.sendStatus(400);

    const findUserIndex = mockUsers.findIndex((user)=>user.id === parsedId)

    if(findUserIndex === -1) return res.sendStatus(404);

    req.findUserIndex = findUserIndex;
}


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

// app.get("/api/users", (req,res)=>{
//     console.log(req.query);
//     res.send(mockUsers)
// })

app.get("/",(req,res, next)=>{
    console.log('BaseURL');
    next()
},
(req,res)=>{
    res.status(201).send({msg:"Hello"})
}
)

app.get('/api/users', (req,res)=>{
    console.log(req.query);
    const {query: {filter, value}} = req;

    if(!filter && !value) return res.send(mockUsers);

    if(filter && value)
        return res.send(mockUsers.filter((user)=>user[filter].includes(value)));
    
    return res.send(mockUsers)
    
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

app.patch("/api/users/:id", (req,res)=>{
    const {body, params:{id}} = req;

    const parsedId = parseInt(id);
    if(isNaN(parsedId)) res.sendStatus(400);

    const findUserIndex = mockUsers.findIndex((user)=>user.id === parsedId)

    if(findUserIndex === -1) return res.sendStatus(404);

    mockUsers[findUserIndex] = {...mockUsers[findUserIndex], ...body}

    return res.sendStatus(200)
})

app.put("/api/users/:id", (req, res)=>{
    const {body, params:{id}} = req;

    const parsedId = parseInt(id);
    if(isNaN(parsedId)) res.sendStatus(400);

    const findUserIndex = mockUsers.findIndex((user)=>user.id === parsedId)

    if(findUserIndex === -1) return res.sendStatus(404);

    mockUsers[findUserIndex] = {id: parsedId, ...body}
    return res.sendStatus(200)
})
 
app.listen(PORT,()=>{
    console.log(`Running on Port ${PORT}`)
})