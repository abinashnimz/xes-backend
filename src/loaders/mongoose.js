import mongoose from 'mongoose';
import constant from '../constant.js';

export default async () => {
    try{
        await mongoose.connect(constant.MONGODB_URL);
        console.log("Database connection successful ✅");
    }catch(err){
        console.log("Database connection failed ❌", err);
    }
}