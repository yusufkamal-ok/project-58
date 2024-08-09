import mongoose from "mongoose";
import { DATABASE_URL } from "./env";
import dotenv from 'dotenv';
dotenv.config();


const connect = () =>{ 
mongoose.connect(DATABASE_URL, {
  autoIndex: true,
  dbName: "sanber-be-final",
  connectTimeoutMS: 10000,
} ).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to database:', error);
});
};
export default connect;
