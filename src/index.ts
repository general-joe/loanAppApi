import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import appRouter from "./routes";
import morgan from "morgan";
import cors from "cors";
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;
app.use(express.json());
app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use("/api", appRouter);
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.log("error handler: ", error.status, next);
  res.status(error.status).json({
    status: error.status,
    error: error.message,
  });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
