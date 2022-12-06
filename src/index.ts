import express, { Request, Response, Express } from "express";
import cors from "cors";
import { usersRouter } from "./routes/usersRouter";
import { postsRouter } from "./routes/postsRouter";

const app: Express = express();
app.use(express.json());
app.use(cors());
app.use("/users", usersRouter);
app.use("/posts", postsRouter);

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Server Running" });
});

app.listen(process.env.PORT || 5000);
