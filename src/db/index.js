import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.URL}/${DB_NAME}`,
    );
    console.log(`\n MongoDB Connected !! DB HOST : ${connectionInstance.connection.host}`);
  } catch (error) {
    console.error("MONGO DB connection Failed", error);
    process.exit(1); // Exiting with non-zero code to indicate failure
  }
};

export default connectDB;
