import {Request, Response, Router} from 'express' 
import { User } from '../models/users'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const SignUp = async(req: Request, res: Response) => {
    try {
        const { username, password } = req.body

    if (!username || !password) {
        res.status(400).json({message: "User name or password is empty"})
        return 
    }
    const existingUser = await User.findOne({username})
    if(existingUser) {
        res.status(400).json({message: "username already exist"})
        return
    }

    const user = new User({username, password})
    await user.save();
    res.status(201).json({message: "Sucess"})
    }catch (error) {
        console.log(error)
        res.status(500).send()
    }    
}

const LogIn = async(req: Request, res: Response) => {
    try {
        const { username, password } = req.body
        if (!username || !password) {
            res.status(400).json({message: "User name or password is empty"})
            return 
        }

        const user = await User.findOne({username}, '+password')

        if(!user || !(await bcrypt.compare(password, user.password))) {
            res.status(400).json({message: "Password is incorrect"})
            return 
        }
        const accesstoken = jwt.sign(
            {userId: user._id},
            process.env.JWT_SECRET!, 
            {expiresIn: '1h'}            
        )
        res.status(200).json({accesstoken, userId: user._id})

    } catch (error)
    {
        res.status(500)
        console.log(error)
    }
}

export const authRouter = Router();
authRouter.post("/auth/signup", SignUp)
authRouter.post("/auth/login", LogIn)

