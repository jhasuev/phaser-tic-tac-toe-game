const PORT = process.env.PORT || 3001
const path = require("path")
const express = require("express")
const socket = require("socket.io")
const ACTIONS = require("../src/scripts/socket/actions.json")
console.log(ACTIONS);

const app = express()
const io = socket(app.listen(PORT))
app.use(express.static(path.join(__dirname, '../dist')))

io.on("connection", socket => {
  console.log("socket.id", socket.id);

  socket.on(ACTIONS.CREATE_ROOM, () => {
    console.log("ACTIONS.CREATE_ROOM");
    console.log("socket.id", socket.id);

    socket.emit(ACTIONS.ROOM_CREATED, 27)
  })
})
