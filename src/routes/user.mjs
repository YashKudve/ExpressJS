import { Router } from "express";
import { query, validationResult, checkSchema, matchedData } from "express-validator";
import { mockUsers } from "../utils/constants.mjs";
import { createUserValidationSchema } from "../utils/validationSchemas.mjs";
import {resolveIndexByUserId} from '../utils/middlewares.mjs'
import { User } from "../mongoose/schema/user.mjs";

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

router.get("/api/users/:id",resolveIndexByUserId, (req,res)=>{
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

router.post("/api/users", async(req,res)=>{
    const {body} = req;
    const newUser = new User(body);
    try {
        const savedUser = await newUser.save()
        return res.status(201).send(savedUser)
    } catch (error) {
        console.log(error);
        return res.sendStatus(400)        
        
    }
})

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
	if (isNaN(parsedId)) return response.sendStatus(400);
	const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);
	if (findUserIndex === -1) return res.sendStatus(404);
	mockUsers.splice(findUserIndex, 1);
	return res.sendStatus(200);
});
export default router;