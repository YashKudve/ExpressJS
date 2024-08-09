import { Router } from "express";

const router = Router();

router.get("/api/products", (req,res)=>{
    res.send([{id:111, name:"Chicken", price: 230}])
})

export default router;