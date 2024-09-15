const Server = require('socket.io');

// Create a socket.io server
const ioHandler = (req, res) => {
    if (!res.socket.server.io) {
        console.log('*First use, starting Socket.IO');
        const io = new Server(res.socket.server);

        // Listen for connection events
        io.on('connection', (socket) => {
            console.log(`Socket ${socket.id} connected.`);

            // เข้าร่วมห้อง
            socket.on("join-room", (roomId) => {
                socket.join(roomId);
                console.log(`User joined room: ${roomId}`);
            });

            // ส่งข้อความในห้อง
            socket.on("send-message", (roomId, message) => {
                io.to(roomId).emit("receive-message", message);
            });

            // Clean up the socket on disconnect
            socket.on('disconnect', () => {
                console.log(`Socket ${socket.id} disconnected.`);
            });
        });
        res.socket.server.io = io;
    }
    res.end();
};

module.exports = ioHandler;