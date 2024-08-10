import { Router } from "express";

const router = Router();

router.get("/api/products", (req,res)=>{
    console.log(req.headers.cookie)
    console.log(req.cookies);
    console.log(req.signedCookies.hello)

    if(req.signedCookies.hello && req.signedCookies.hello === "world")
       return res.send([{id:111, name:"Chicken", price: 230}]);

    else
    return res.send({msg: "Sorry. You need the correct cookie"});
       
})

export default router;