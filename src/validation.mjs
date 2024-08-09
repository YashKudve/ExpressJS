import express, { response } from 'express'
import { query,validationResult, body, matchedData, checkSchema } from 'express-validator';
// import {createUserValidationSchema} from '../utils/validationSchemas.mjs'
import {createUserValidationSchema} from './utils/validationSchemas.mjs'
import usersRouter from './routes/user.mjs'

const app = express();

app.use(express.json())
app.use(usersRouter)

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

app.get("/",(req,res, next)=>{
    console.log('BaseURL');
    next()
},
(req,res)=>{
    res.status(201).send({msg:"Hello"})
}
)

// app.get('/api/users',
//     query('filter')
//     .isString()
//     .notEmpty().withMessage('Cannot be empty')
//     .isLength({min:3, max:10}).withMessage('should be between 3-10 characters'),
//      (req,res)=>{
//     // console.log(req.query);
//     console.log(req["express-validator#contexts"]);

//     const result = validationResult(req);
//     console.log(result);
    
//     const {query: {filter, value}} = req;

//     if(!filter && !value) return res.send(mockUsers);

//     if(filter && value)
//         return res.send(mockUsers.filter((user)=>user[filter].includes(value)));
    
//     return res.send(mockUsers)
    
// })

// app.get("/api/users/:id", (req,res)=>{
//     // console.log(req.params);
//     const parsedId = parseInt(req.params.id)    
//     console.log(parsedId);

//     if (isNaN(parsedId)) {
//         return res.status(400).send(`Bad Request:: Invalid ID`)
//     }

//     const findUser = mockUsers.find((user)=>user.id === parsedId)

//     if(!findUser) return res.send(`User not found`);

//     return res.send(findUser)
    
// })

// app.post('/api/users',checkSchema(createUserValidationSchema),(req, res)=>{
//     // console.log(req.body);
//     const result = validationResult(req)
//     console.log(result);

//     if(!result.isEmpty())
//         return res.status(400).send({errors: result.array()});

//     const data  = matchedData(req);
//     console.log(data);
    
//     // const {body} = req;

//     const newUser = {id: mockUsers[mockUsers.length - 1].id + 1, ...data}
//     mockUsers.push(newUser)
//     return res.status(201).send(newUser)
// })

app.patch("/api/users/:id", (req,res)=>{
    const {body, params:{id}} = req;

    const parsedId = parseInt(id);
    if(isNaN(parsedId)) res.sendStatus(400);

    const findUserIndex = mockUsers.findIndex((user)=>user.id === parsedId)

    if(findUserIndex === -1) return res.sendStatus(404);

    mockUsers[findUserIndex] = {...mockUsers[findUserIndex], ...body}

    return res.sendStatus(200)
})

app.put("/api/users/:id",resolveIndexByUserId, (req, res)=>{
    const {body,findUserIndex} = req;

    mockUsers[findUserIndex] = {id: mockUsers[findUserIndex].id, ...body}
    return res.sendStatus(200)
})
 
app.listen(PORT,()=>{
    console.log(`Running on Port ${PORT}`)
})