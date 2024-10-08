import { request, Router } from "express";
import { query, validationResult, checkSchema, matchedData } from "express-validator";
import { mockUsers } from "../utils/constants.mjs";
import { createUserValidationSchema } from "../utils/validationSchemas.mjs";
import {resolveIndexByUserId} from '../utils/middlewares.mjs'
import { User } from "../mongoose/schema/user.mjs";
import { hashPassword } from "../utils/helpers.mjs";
import { getUserByIdHandler, createUserHandler } from "../handlers/users.mjs";

const router = Router();

router.get('/api/users',
    query('filter')
    .isString()
    .notEmpty().withMessage('Cannot be empty')
    .isLength({min:3, max:10}).withMessage('should be between 3-10 characters'),
     (req,res)=>{
    // console.log(req.query);
    // console.log(req["express-validator#contexts"]);

    console.log(req.session);
    console.log(req.session.id);

    req.sessionStore.get(req.session.id, (err, sessionData)=>{
        if(err){
            console.log(err);
            throw err;
        }
        console.log("Inside session store GET")
        console.log(sessionData)
    })

    const result = validationResult(req);
    console.log(result);
    
    const {query: {filter, value}} = req;

    if(!filter && !value) return res.send(mockUsers);

    if(filter && value)
        return res.send(mockUsers.filter((user)=>user[filter].includes(value)));
    
    return res.send(mockUsers)
    
})

router.get("/api/users/:id",resolveIndexByUserId, getUserById)

// router.post('/api/users',checkSchema(createUserValidationSchema),(req, res)=>{
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

router.post("/api/users", checkSchema(createUserValidationSchema), 
createUserHandler
// async(req,res)=>{
//     const result  = validationResult(req)
//     if(!result.isEmpty()) return res.status(400).send(result.array())

//     // const {body} = req;
//     // const newUser = new User(body);

//     const data = matchedData(req);
//     console.log(data);

//     data.password = hashPassword(data.password)
//     console.log(data);

//     const newUser = new User(data);
//     try {
//         const savedUser = await newUser.save()
//         return res.status(201).send(savedUser)
//     } catch (error) {
//         console.log(error);
//         return res.sendStatus(400)        
        
//     }
// }
)

router.patch("/api/users/:id", (req,res)=>{
    const {body, params:{id}} = req;

    const parsedId = parseInt(id);
    if(isNaN(parsedId)) res.sendStatus(400);

    const findUserIndex = mockUsers.findIndex((user)=>user.id === parsedId)

    if(findUserIndex === -1) return res.sendStatus(404);

    mockUsers[findUserIndex] = {...mockUsers[findUserIndex], ...body}

    return res.sendStatus(200)
})

router.put("/api/users/:id",resolveIndexByUserId, (req, res)=>{
    const {body,findUserIndex} = req;

    mockUsers[findUserIndex] = {id: mockUsers[findUserIndex].id, ...body}
    return res.sendStatus(200)
})

router.delete("/api/users/:id", (req, res) => {
	const {
		params: { id },
	} = req;
	const parsedId = parseInt(id);
	if (isNaN(parsedId)) return res.sendStatus(400);
	const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);
	if (findUserIndex === -1) return res.sendStatus(404);
	mockUsers.splice(findUserIndex, 1);
	return res.sendStatus(200);
});
export default router;