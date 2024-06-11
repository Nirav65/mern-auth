import User from '../models/userModel.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({
        username,
        email,
        password: hashedPassword
    });
    try {
        await newUser.save();
        res.status(201).json({message:"User added successfully."});
    } catch (error) {
        next(error);
    }
}

const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email });
        if(!validUser){ return next(errorHandler(404, 'User not found')); }
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if(!validPassword){ return next(errorHandler(401, 'wrong credentials')); }
        const userToken = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        const { password: pwd , ...rest } = validUser._doc;
        const expireDate = new Date(Date.now() + 3600000); //1 hour
        res.cookie('access_token', userToken, { httpOnly: true, expires: expireDate}).status(200).json(rest);
    } catch (error) {
        next(error);
    }
}

export { signup, signin };