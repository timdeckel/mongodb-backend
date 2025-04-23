import {
  model,
  Schema,
  SchemaTypes,
  Types,
  type Model,
  type Document,
} from "mongoose";

type TPost = Document & {
  title: string;
  content?: string;
  author: Types.ObjectId;
  comments: Types.DocumentArray<TComment>;
  createdAt: Date;
  updatedAt: Date;
};

type TComment = Document & {
  content: string;
  author: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

const CommentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    author: {
      type: SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
    },
    author: {
      type: SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    comments: [CommentSchema],
  },
  {
    timestamps: true,
  }
);

type CommentModel = Model<TComment, {}>;

export const Post = model<TPost>("Post", PostSchema);
export const Comment = model<TComment, CommentModel>("Comment", CommentSchema);
