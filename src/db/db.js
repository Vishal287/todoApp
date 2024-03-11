import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectDb = await mongoose.connect(
      `mongodb+srv://vishal-parmar:ekVPJVHA2ImED2Ap@cluster0.sw2js.mongodb.net/Demo
      ?retryWrites=true&w=majority&appName=Cluster0
      `,
    );
    console.log(`Database connected successfully! ${connectDb}`);
  } catch (error) {
    console.log(`Database not-connected! ${error}`);
    process.exit(1);
  }
};

export default connectDB;
