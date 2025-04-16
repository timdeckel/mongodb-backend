import {Request, Response, Router} from 'express' 
import { Post } from '../models/post'
import { authenticate } from '../middleware/authenticate'

const createPost = async(req: Request, res: Response) => {
    try {
    const { title, content } = req.body

    if (!title || typeof title !== "string") {
        res.status(400).json({message: "Malformed Post Title"})
        return
    }

    if (content !== undefined && typeof content !== 'string') {
        res.status(400).json({message: "Malformed Post Content"})
        return
    }

    const post = await Post.create({title, content, author: req.userId})
    res.status(201).json({id: post._id})

}catch (error) {
    res.status(500)
}
}

export const postRouter = Router();
postRouter.post("/posts", authenticate, createPost)