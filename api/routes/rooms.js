import express from "express";
import { getAllRoom,getRoom,createRoom,updateRoom,deleteRoom } from "../controller/room.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();


//GET ALL 
router.get('/', getAllRoom)

//GET ONE
router.get('/:id', getRoom)
    

//CREATE
router.post("/:hotelid", verifyAdmin, createRoom);

//UPDATE
router.put("/update/:id", verifyAdmin, updateRoom); 

//DELETE
router.delete('/delete/:id/:hotelid', verifyAdmin, deleteRoom);

export default router