
const express = require("express")
const app = express()
const http = require("http")
const cors = require("cors")
const { Server } = require("socket.io")
const { useEffect } = require("react")
let devices = []
app.use(cors())
const server = http.createServer(app)
const FindIndex = (list, room) => {
    for (let i = 0; i < list.length; i++) {
        if (list[i]["oda"] === room) return i
    }
    return -1
}
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
})


io.on("connection", (socket) => {
    socket.on("server", (data) => {
        socket.broadcast.emit("newServer", data)
        socket.emit("newServer", data)
    })
    socket.on("xbutton", (room) => {
        socket.broadcast.to(room).emit("newXButton", true)
        socket.emit("newOButton", true)
    })
    socket.on("obutton", (room) => {
        socket.broadcast.to(room).emit("newOButton", true)
        socket.emit("newOButton", true)
    })
    socket.on("restart", (veri) => {
        socket.broadcast.to(veri).emit("rest")
        socket.emit("rest")
    })

    socket.on("twoPlayerRoom", (odaName) => {
        const index = FindIndex(devices, odaName)
        console.log(index);
        if (index !== -1) {
            if (devices[index]["member"] === 2) {
                socket.emit("dolu", true)
            }
            else {
                socket.emit("dolu", false)
                devices[index]["member"] += 1
                socket.join(odaName)
                console.log(devices);
                if (devices[index]["member"] === 2) {
                    socket.broadcast.to(odaName).emit("start", true)
                    socket.emit("start", true)
                }
                else {
                    socket.broadcast.to(odaName).emit("start", false)
                    socket.emit("start", false)
                }
            }
        }
        else {
            socket.join(odaName)
            socket.emit("dolu", false)
            devices = [...devices, { "oda": odaName, "member": 1 }]
            console.log(devices);
        }
    })
    socket.on("msg1", (msg, room) => {
        socket.to(room).emit("msg", msg)
    })
    socket.on("forceDisconnect", (data) => {
        socket.broadcast.to(data).emit("start", false)
        socket.emit("gameMode")
        socket.leave(data)
        const index = FindIndex(devices, data)
        if (index !== -1) {
            devices[index]["member"] -= 1
            if (devices[index["member"]] === 0) devices.pop(devices[index])
        }
    })
    socket.on("disconnecting", () => {
        const index = FindIndex(devices, Array.from(socket.rooms)[1])
        console.log(index);
        if (index !== -1) {
            socket.broadcast.to(devices[index]["oda"]).emit("start", false)
            devices[index]["member"] -= 1
            if (devices[index]["member"] === 0) {
                devices.pop(devices[index])
            }
        }
        else console.log("index bulunamadı");

    })
})

server.listen(3001, () => {
    console.log("SERVER RUNNİNG")
})