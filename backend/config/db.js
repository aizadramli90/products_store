import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
    //console.dir(conn, { depth: null });
  } catch (error) {
    console.error(`error connecting to MongoDB: ${error.message}`);
    process.exit(1); //exit with failure, 0 means succcess
  }
};
