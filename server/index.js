const express = require('express')
const app = express()
const http = require('http');
const cors = require('cors')
const { Server } = require('socket.io')
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173'
    }
})
// origin:"http://localhost:3003"

io.on("connection", (socket) => {
    console.log(`user connected to : ${socket.id}`)

    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`user:  ${socket.id} , joined room :${data}`)
    })

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("recieve_message", data)
    })

    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);
    })
})

server.listen(4000, () => {
    console.log(
        "server is running"
    );
})