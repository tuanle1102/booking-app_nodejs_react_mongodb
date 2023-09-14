import express from "express";
import { getAllUser,getUser,createUser,updateUser,deleteUser} from "../controller/user.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";
const router = express.Router();


//GET ALL 
router.get('/', verifyAdmin, getAllUser)

//GET ONE
router.get('/:id', getUser)
    

//CREATE
router.post("/create", verifyUser, createUser);

//UPDATE
router.put("/update/:id", verifyUser, updateUser); 

//DELETE
router.delete('/delete/:id',verifyAdmin, deleteUser);


export default router