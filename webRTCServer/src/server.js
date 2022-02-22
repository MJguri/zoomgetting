// import express from "express"
import SocketIO from "socket.io"

// const app = express();
const port = 3333;
const wsServer = new SocketIO.Server(
    {cors:
            {
                origin: "http://localhost:3000"
            }
    });

wsServer.on("connection", (socket) => {
    socket.on("join_room", (roomName) => {
        socket.join(roomName);
        socket.to(roomName).emit("welcome");
    });
    socket.on("offer", (offer, roomName) => {
        socket.to(roomName).emit("offer", offer);
    });
    socket.on("answer", (answer, roomName) => {
        socket.to(roomName).emit("answer", answer);
    });
    socket.on("ice", (ice, roomName) => {
        socket.to(roomName).emit("ice", ice);
    });
});
const handleListen = () => console.log(`Server Start! Port:${port}`)
wsServer.listen(port);

// app.listen(port, handleListen);