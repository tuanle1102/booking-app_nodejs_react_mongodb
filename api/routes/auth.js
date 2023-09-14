import express from "express";
import { register, login} from "../controller/auth.js";
import { verifyToken,verifyUser } from "../utils/verifyToken.js";


const router = express.Router();

router.get("/check", verifyToken, (res,req)=>{
    res.send("hello Admin")
});
router.get("/checkuser/:id ", verifyUser, (res,req)=>{
    res.send("You are not Admin")
});
router.post("/register", register);
router.get("/login", login);

export default router