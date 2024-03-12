import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectDb = await mongoose.connect(`${process.env.DB_HOST}`);
    console.log(`Database connected successfully! ${connectDb}`);
  } catch (error) {
    console.log(`Database not-connected! ${error}`);
    process.exit(1);
  }
};

export default connectDB;
