"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const socket_io_1 = require("socket.io");
const http_1 = require("http");
const axios_1 = __importDefault(require("axios"));
const server = (0, http_1.createServer)();
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true,
        methods: ["GET", "POST"]
    }
});
io.on("connection", (socket) => {
    // เข้าร่วมห้อง
    socket.on("join-room", (roomId) => {
        socket.join(roomId);
        console.log(`User joined room: ${roomId}`);
    });
    // ส่งข้อความในห้อง
    socket.on("send-message", (roomId, message) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(`Received message: ${message}`);
        const send = {
            content: message.msg,
            state_chat: message.sender,
        };
        io.to(roomId).emit("receive-message", send);
        yield axios_1.default.post('http://localhost:3000/api/chat', message);
    }));
    // เมื่อผู้ใช้ตัดการเชื่อมต่อ
    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});
server.listen(4000, () => {
    console.log('Server is running on port 4000');
});
