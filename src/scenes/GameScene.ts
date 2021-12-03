import Helper from "../classes/Helper"
import Cells from "../classes/Cells"
import InfoBox from "../classes/InfoBox"
import _configs from "../configs"
import Npc from "../classes/Npc"
const { GAME } = _configs

export default class GameScene extends Phaser.Scene {
  public helper: any
  public cells: any
  public enemy: any
  public player: any
  public queueId: string
  public winnerId: string
  public params: object|any
  public infoBox: object|any

  constructor() {
    super("GameScene")
  }

  create(params = {}) {
    this.params = params
    
    this.helper = new Helper(this)
    this.helper.drawBackground()
    
    this.cells = new Cells(this)
    this.cells.create({
      onCellClick: this.onCellClick.bind(this)
    })
    
    this.initPlayers()
    this.infoBox = new InfoBox(this)
    this.infoBox.updateQueue()
    this.start()
  }

  initPlayers() {
    this.player = new Npc(this)
    this.enemy = new Npc(this)
    this.winnerId = ''
    
    if (this.params.type == 'pve') {
      this.enemy.isBot = true
      this.enemy.id = 'enemy'
      this.player.id = 'player'
      
      const signs = ['x', 'o']
      this.player.sign = signs.splice(Phaser.Math.Between(0, 1), 1)[0]
      this.enemy.sign = signs[0]

      this.queueId = [this.enemy.id, this.player.id][Phaser.Math.Between(0, 1)]
    }

    if (this.params.type == 'pvp') {
      this.enemy.isBot = false

      this.enemy.id = this.params.enemyId
      this.player.id = this.params.playerId
      
      this.enemy.sign = this.params.enemySign
      this.player.sign = this.params.playerSign
      
      this.queueId = this.params.queueId
    }
  }

  start() {
    if (this.queueId == this.enemy.id) {
      this.enemy.walk()
    }
  }

  onWin(winner: string) {
    this.winnerId = this.player.sign === winner ? this.player.id : this.enemy.id
    this.time.addEvent({
      delay: GAME.duration,
      callback: () => {
        // TODO: перекинуть на сцену результата
        this.scene.start("MenuScene")
      },
    })
  }

  hasWinner(): boolean {
    return !!this.winnerId
  }

  onCellClick(pointer: object, object: object|any) {
    if (this.queueId === this.player.id) {
      // добавляем наш знак в выбранную клетку
      this.cells.setSign(object.cell, this.player.sign)

      // переводим очередь на врага
      this.setQueueToEnemy()
    }
  }

  setQueueToEnemy() {
    if (this.hasWinner()) {
      return console.error("has winner...")
    }

    this.queueId = this.enemy.id
    
    // обновляем данные: текст текущего ходящего
    this.infoBox.updateQueue()

    if (this.enemy.isBot) {
      this.enemy.walk()
    } else {
      // TODO: отправить на сервер запрос и передать очередь сопернику
    }
  }

  setQueueToPlayer() {
    if (this.hasWinner()) {
      return console.error("has winner...")
    }
    
    this.queueId = this.player.id
    
    // обновляем данные: текст текущего ходящего
    this.infoBox.updateQueue()
  }
}
