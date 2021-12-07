class Game {
  constructor() {
    this.rooms = []
  }

  createRoom(socketId) {
    const room = {
      id: this.getNextRoomId(),
      players: [],
      queueId: '',
    }

    this.rooms.push(room)
    this.addPlayer(room.id, socketId)

    return room
  }

  addPlayer(roomId, socketId) {
    const room = this.getRoomById(roomId)
    const signs = ['x', 'o']
    let sign = signs.splice(this.getRandomNum(signs.length), 1)[0]

    if (room.players.length && room.players[0].sign === sign) {
      sign = signs[0]
    }

    room.players.push({ socketId, sign })
    room.queueId = room.players[
      this.getRandomNum(room.players.length)
    ].socketId

    return room
  }

  getRandomNum(max) {
    return Math.floor(Math.random() * max)
  }

  removeRoomByRoomId(roomId) {
    this.rooms = this.rooms.filter(room => room.id != roomId)
  }

  removeRoomByUserId(userId) {
    this.rooms = this.rooms.filter(
      room => !room.players.some(player => player.socketId == userId)
    )
  }

  getNextRoomId() {
    return this.rooms.reduce((acc, { id }) => Math.max(id, acc), 0) + 1
  }

  getRoomById(id) {
    return this.rooms.find(room => room.id === id)
  }

  getEnemyIdOf(roomId, socketId) {
    const room = this.getRoomById(roomId)
    if (room) {
      const enemy = room.players.find(player => player.socketId != socketId)
      if (enemy) {
        return enemy.socketId
      }
    }
    
    return null
  }

  getRoomWithPlayer(playerId) {
    return this.rooms.find(
      room => room.players.some(player => player.socketId == playerId)
    )
  }

  hasRoomWithPlayer(playerId) {
    return !!this.getRoomWithPlayer(playerId)
  }
}

module.exports = Game