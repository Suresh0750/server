import mongoose,{Document,Schema} from "mongoose";
import { User } from "../../../../domain/entities/user";


const userSchema = new Schema({
    username: { type: String,trim:true },
    phoneNumber: { type: Number },
    emailAddress: { type: String, unique: true },
    address: { type: String },
    password: { type: String },
    isVerified: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false }, // Changed from `isBlock` to `isBlocked`
    profile: { type: String },
}, { timestamps: true });
const UserModel = mongoose.model<User & Document>('User',userSchema,"users")

export {UserModel}      