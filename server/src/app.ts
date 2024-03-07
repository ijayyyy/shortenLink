import "dotenv/config";
import mongoose from "mongoose";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";

import dbConnect from "./config/db";
import baseRouter from "./routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ credentials: true, origin: true, methods: ["POST", "GET"] }));

const port = process.env.PORT; 
app.listen(port, () => {
  console.log("Server running on port: " + port);
});

dbConnect();
app.get("/", (req, res) => res.send("Express on Vercel"));


app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`Route call: ${req.method} : ${req.originalUrl}`);
  next();
});

app.use("/api", baseRouter);
