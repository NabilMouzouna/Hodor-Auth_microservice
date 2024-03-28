import mongoose from "mongoose";
// connection to database

const connectDB = async() => { 
    try {
       await mongoose.connect(process.env.MONGODB_URI!);
        console.log('database connection established');
      } catch (error) {
        console.log(error);
      }
 }

 export default connectDB