/**
 * @swagger
 * /api/:
 *   get:
 *     summary: Get a list of users
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               users: []
 */




import express from "express";
import { createHotel,deleteHotel, getAllHotel, getHotel, updateHotel,countByCity, countByType, getHotelRooms } from "../controller/hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();



//GET ALL 
router.get('/', getAllHotel)

//GET ONE
router.get('/find/:id', getHotel)
    

//CREATE
router.post("/create", verifyAdmin, createHotel);

//UPDATE
router.put("/update/:id", verifyAdmin, updateHotel); 

//DELETE
router.delete('/delete/:id', verifyAdmin, deleteHotel);

router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/room/:id", getHotelRooms);

export default router