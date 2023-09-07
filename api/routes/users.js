import express from "express";
import { getAllUser,getUser,createUser,updateUser,deleteUser} from "../controller/user.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();


//GET ALL 
router.get('/', getAllUser)

//GET ONE
router.get('/:id', getUser)
    

//CREATE
router.post("/create", verifyAdmin, createUser);

//UPDATE
router.put("/update/:id", verifyAdmin, updateUser); 

//DELETE
router.delete('/delete/:id',verifyAdmin, deleteUser);


export default router