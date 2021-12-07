const PORT = process.env.PORT || 3001
const path = require("path")
const express = require("express")
const socket = require("socket.io")
const app = express()
const io = socket(app.listen(PORT))
const Game = new require("./classes/Game")
const game = new Game()
const ACTIONS = require("../src/scripts/socket/actions.json")

app.use(express.static(path.join(__dirname, '../dist')))

io.on("connection", socket => {
  console.log("connected socket.id", socket.id);

  socket.on(ACTIONS.CREATE_ROOM, () => {
    if (game.hasRoomWithPlayer(socket.id)) {
      return console.error('user already created room')
    }
    
    const roomId = game.createRoom(socket.id)
    socket.emit(ACTIONS.ROOM_CREATED, roomId)
  })

  socket.on(ACTIONS.REMOVE_ROOM, roomId => {
    game.removeRoomByRoomId(roomId)
  })

  socket.on(ACTIONS.ENTER_ROOM, roomId => {
    console.log('ACTIONS.ENTER_ROOM roomId', roomId);
    let room = game.getRoomById(roomId)
    if (room) {
      game.addPlayer(room.id, socket.id)
      room = game.getRoomById(roomId)
      
      room.players.forEach(({socketId}) => {
        const data = {
          ...room,
          enemyId: game.getEnemyOf(roomId, socketId),
          playerId: socketId,
        }
        io.to(socketId).emit(ACTIONS.INIT_GAME, data)
      })
    } else {
      socket.emit(ACTIONS.WRONG_ROOM)
    }
  })

  socket.on(ACTIONS.SET_SIGN, ({enemyId, coords}) => {
    console.log('====================================')
    console.log('socket.id', socket.id)
    console.log('enemyId', enemyId)
    console.log('coords', coords)
    io.to(enemyId).emit(ACTIONS.SET_SIGN, coords)
  })

  socket.on(ACTIONS.SWITCH_QUEUE, ({queueId}) => {
    console.log('queueId', queueId)
    io.to(queueId).emit(ACTIONS.SET_QUEUE)
  })
  
  socket.on('disconnect', () => {
    console.log('disconnected socket.id', socket.id);
    game.removeRoomByUserId(socket.id)
  })
})
