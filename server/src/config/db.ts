import "dotenv/config";
import mongoose from "mongoose";

const port = process.env.PORT;

const dbConnect = () => {
  mongoose
    .connect(process.env.MONGO_CONNECTION_STRING!)
    .then(() => {
      console.log("Mongoose connected");
    })
    .catch(console.error);
};

export default dbConnect;
