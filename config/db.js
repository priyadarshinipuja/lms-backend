import mongoose from 'mongoose';
import {MONGO_URI} from './env.js';

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
 
    console.log(`MongoDB Connected ${connect.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
