import User from "../models/User.js"

export const createUser = async (req,res,next)=>{
    const newUser = new User(req.body);

    try {
        const saveUser = await newUser.save()
        res.status(200).json(saveUser)
    } catch (error) {
        next(error);
    }
}

export const updateUser = async (req,res,next)=>{
    const newUser = new User(req.body);

    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id, 
            {$set: req.body },
             { new: true });
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}


export const getUser = async (req,res,next)=>{
    try {
        const user = await User.findById(
            req.params.id
        );
        res.status(200).json(user);
        
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}



export const getAllUser = async (req,res,next)=>{
    const newUser = new User(req.body);

    try {
        const user = await User.find();
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


export const deleteUser = async (req,res,next)=>{
    const newUser = new User(req.body);

    try {
        await User.findByIdAndRemove(req.params.id);
        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}