import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const checkAdminAccess = (req, res, next) => {
    if (req.user.isAdmin) {
      next(); 
    } else {
      res.status(403).json({ message: 'Access Forbidden' }); // Ngăn truy cập nếu isAdmin là false
    }
  };
  

export const register = async (req,res,next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password,salt)
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
        })
        await newUser.save()
        res.status(200).send("User has been create")
    } catch (err) {
        next(err);
    }

}


export const login = async (req,res,next) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) return next(createError(404, "User not found!"));
    
        const isPasswordCorrect = await bcrypt.compare(
          req.body.password,
          user.password
        );
        if (!isPasswordCorrect)
          return next(createError(400, "Wrong password or username!"));
          const { password, isAdmin, ...otherDetails } = user._doc;
         const token = jwt.sign({id: user._id, isAdmin: user.isAdmin},process.env.JWT);
          res.cookie("access_token",token,{
            httpOnly: true,
          }).status(200)
            .json({ details: { ...otherDetails }, isAdmin });;
            
        }
        catch(err){
            next(err);
        }
}