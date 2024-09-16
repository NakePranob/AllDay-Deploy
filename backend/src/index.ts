const express = require('express')
import { Server } from 'socket.io'
import { createServer } from 'http'
import axios from 'axios'
const server = createServer()

const io = new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        credentials:true,
        methods:["GET","POST"]
    }
})

io.on("connection", (socket) => {
    // เข้าร่วมห้อง
    socket.on("join-room", (roomId) => {
        socket.join(roomId);
        console.log(`User joined room: ${roomId}`);
    });

    // ส่งข้อความในห้อง
    socket.on("send-message", async (roomId, message) => {
        console.log(`Received message: ${message}`);
        const send = {
            content: message.msg,
            state_chat: message.sender,
        }
        io.to(roomId).emit("receive-message", send);
        await axios.post('http://localhost:3000/api/chat', message);
    });

    // เมื่อผู้ใช้ตัดการเชื่อมต่อ
    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});

server.listen(4000,()=>{
    console.log('Server is running on port 4000')
})