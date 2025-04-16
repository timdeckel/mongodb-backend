import {model, Schema, SchemaTypes, Types, type Document} from 'mongoose'

type TPost = Document & {
    title: string,
    content?: string,
    author: Types.ObjectId,
    comments: [TComment],
    createdAt: Date,
    updateAt: Date
}

type TComment = Document & {
    content: string,
    author: Types.ObjectId,
    createdAt: Date,
    updateAt: Date
}

const CommentSchema = new Schema (
    {
        comment: {
            content: {
                type: String,
                requried: true
            },
            author: {
                type: SchemaTypes.ObjectId,
                ref: 'User', 
                required: true
            }
        }
    },
    {
        timestamps: true
    }
)

const PostSchema = new Schema (
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        content: {
            type: String,
        },
        author: {
            type: SchemaTypes.ObjectId,
            ref: 'User', 
            required: true
        },
        comments: [CommentSchema]
    },
    {
        timestamps: true
    }
)

export const Post = model<TPost>("Post", PostSchema)