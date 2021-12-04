import configs from "../configs"
const { GAME } = configs

export default class Npc {
  public scene: any
  public isBot: any = false
  public sign: string
  public id: string
  
  constructor(scene: any | object) {
    this.scene = scene
  }

  botWalk() {
    this.scene.time.addEvent({
      delay: Phaser.Math.Between(100, 500) + GAME.apperingDuration,
      callback: this.botWalkHandler,
      callbackScope: this,
    })
  }

  botWalkHandler() {
    const cells: object[] = this.scene.cells.getFreeCells()
    if (cells.length) {
      const cell: any| object = cells[Phaser.Math.Between(0, cells.length - 1)]
      
      if (this.scene.canBotPass(cell)) {
        this.scene.cells.setSign(cell, this.sign)
        this.scene.setQueueToPlayer()
      }
    }
  }
}
