"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageModel = void 0;
const mongoose_1 = require("mongoose");
const MessageSchema = new mongoose_1.Schema({
    conversationId: {
        type: mongoose_1.Schema.Types.ObjectId,
        requried: true,
        ref: "Conversation",
    },
    sender: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    message: { type: String, required: true, trim: true },
    isRead: { type: Boolean, required: true, default: false }
}, { timestamps: true });
exports.MessageModel = (0, mongoose_1.model)("Message", MessageSchema, "messages");
// const MessageSchema = new Schema({
//     conversationId:{
//         type:Schema.Types.ObjectId,
//         required:true
//     },
//     sender:{type:String,required:true},
//     message:{type:String,required:true},
//     isRead: {type:Boolean,required:true,default:false}
// },{timestamps:true})
