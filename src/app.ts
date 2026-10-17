import type {} from "./@types/express/index.js";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import router from "./routes.js";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5174", "https://fluxtiva.vercel.app"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(express.json());
app.use(router);

app.use((error: Error, _: Request, res: Response, _next: NextFunction) => {
  if (error instanceof Error) {
    return res.status(400).json({
      error: error.message,
    });
  }

  return res.status(500).json({
    error: "Internal server error!",
  });
});

export default app;
