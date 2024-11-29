"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketHandler = void 0;
const socketHandler = (io) => {
    io.on("connection", (socket) => {
        // console.log("New client connected")
        socket.on("joinRoom", (conversationId) => {
            console.log('User joined room', conversationId);
            socket.join(conversationId);
        });
        socket.on("message", (messageData) => {
            // console.log(messageData)
            // console.log(`Message received in room ${messageData.conversationId}`,messageData)
            if (!messageData.conversationId || !messageData.message) {
                // console.error("Invalid message data:", messageData);
                return;
            }
            io.to(messageData.conversationId).emit("message", messageData);
        });
        socket.on("disconnect", () => {
            console.log('Client disconnected');
        });
    });
};
exports.socketHandler = socketHandler;
