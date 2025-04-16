import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'
import { authRouter } from './routes/auth'
import { postRouter } from './routes/posts'

const app = express()
app.use(express.json())
app.use(authRouter)
app.use(postRouter)

mongoose.connect(process.env.DB_URL!)
    .then( () => {
        const PORT = process.env.PORT 
        app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
    })

