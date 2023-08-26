import express from "express";
import Hotel from "../models/Hotel.js";
import bodyParser from "body-parser";

const router = express.Router();


//GET ALL 
router.get('/', async (req, res) => {
    try {
        const hotel = await Hotel.find();
        res.json(hotel);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
//CREATE
router.post("/create", async (req,res)=>{
    const newHotel = new Hotel(req.body)    
    try {
        const saveHotel = await newHotel.save()
        res.status(200).json(saveHotel)
    } catch (error) {
        res.status(500),json(error)
    }
});

//UPDATE
router.put("/update/:id", async (req, res) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(
            req.params.id, 
            {$set: req.body },
             { new: true });
        res.json(updatedHotel);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//DELETE
router.delete('/delete/:id', async (req, res) => {
    try {
        await Hotel.findByIdAndRemove(req.params.id);
        res.json({ message: 'Hotel deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router