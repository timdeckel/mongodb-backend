import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import { authRouter } from "./routes/auth";
import { postRouter } from "./routes/posts";
import { profileRouter } from "./routes/profile";
import { commentsRouter } from "./routes/comment";

import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
app.use(authRouter);
app.use(postRouter);
app.use(commentsRouter);
app.use(profileRouter);

app.get("/", (req, res) => {
  res.send("success");
});

mongoose.connect(process.env.DB_URL!).then(() => {
  const PORT = process.env.PORT;
  app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
});
