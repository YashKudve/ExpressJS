import { mockUsers } from "../utils/constants.mjs";

export const getUserByIdHandler = (req,res)=>{
    const {findUserIndex} = req;
    const findUser = mockUsers[findUserIndex];
    if(!findUser) return res.sendStatus(404);
    return res.send(findUser)
}

export const createUserHandler = async(req,res)=>{
    const result  = validationResult(req)
    if(!result.isEmpty()) return res.status(400).send(result.array())

    // const {body} = req;
    // const newUser = new User(body);

    const data = matchedData(req);
    console.log(data);

    data.password = hashPassword(data.password)
    console.log(data);

    const newUser = new User(data);
    try {
        const savedUser = await newUser.save()
        return res.status(201).send(savedUser)
    } catch (error) {
        console.log(error);
        return res.sendStatus(400)        
        
    }
}