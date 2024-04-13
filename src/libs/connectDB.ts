import mongoose from "mongoose";
// connection to database

const DATABASE_PROVIDER = 'mongoDB'


const connectDB = async() => { 
    try {
       await mongoose.connect(process.env.MONGODB_URI!);
        console.log(`\t✅\u001b[1mConnected Database on\u001b[0m \x1b[32m${DATABASE_PROVIDER}\x1b[0m\n`);
      } catch (error) {
        console.log(error);
      }
 }

 export default connectDB