import {model, MongooseError, Schema, type Document} from 'mongoose'
import bcrypt from 'bcrypt'

type TUser = Document & {
    username: string,
    password: string,
    createdAt: Date,
    updateAt: Date,
}

const UserSchema = new Schema(
    {
    username: {
        type: String,
        required: true,
        uniqe: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    }
},
{
    timestamps: true
}
)

UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next()
    }

    try {
        const encryptedPassword = await bcrypt.hash(this.password, 10)
        this.password = encryptedPassword
    } catch(error) {
        if(error instanceof MongooseError) {
            next(error)
        }
         throw(Error)   
    }
})

export const User = model<TUser>("User", UserSchema)