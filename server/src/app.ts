import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";

import dbConnect from "./config/db";
import baseRouter from "./routes";

const app = express();
 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
   credentials: true,
    origin: "delicate-cocada-132c97.netlify.app", 
   methods: ["POST", "GET"],
   allowedHeaders: ["Content-Type", "Authorization"], 
  }));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server running on port: " + port);
});

dbConnect();

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`Route call: ${req.method} : ${req.originalUrl}`);
  next();
});

app.use("/api", baseRouter); 

export default app;
