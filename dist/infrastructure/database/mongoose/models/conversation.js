"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationModel = void 0;
const mongoose_1 = require("mongoose");
const ConversationShema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    workerId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Worker",
        required: true
    },
    lastMessage: {
        type: String,
        trim: true
    },
    userUnread: {
        type: Number,
        default: 0
    },
    workerUnread: {
        type: Number,
        default: 0
    }
}, { timestamps: true });
exports.ConversationModel = (0, mongoose_1.model)("Conversation", ConversationShema, 'conversations');
// const ConversationShema = new Schema({
//     userId:{
//         type: Schema.Types.ObjectId,
//         ref:'userdatas',
//         required:true
//     },
//     workerId:{
//         type: Schema.Types.ObjectId,
//         ref:'workerdetails',
//         required:true
//     },
//     lastMessage : {type:String},
//     userUnread : {type:Number,default:0},
//     workerUnread : {type:Number,default:0},
// },{timestamps:true})
// export const ConversationModel = model("ConversationCollection",ConversationShema)
