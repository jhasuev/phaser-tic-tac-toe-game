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

  walk() {
    this.scene.time.addEvent({
      delay: Phaser.Math.Between(100, 500) + GAME.apperingDuration,
      callback: () => {
        const cells: object[] = this.scene.cells.getFreeCells()
        if (cells.length) {
          this.scene.cells.setSign(
            cells[
              Phaser.Math.Between(0, cells.length - 1)
            ],
            this.sign,
          )
          this.scene.setQueueToPlayer()

          console.log('ENEMY (BOT) IS PASSED')
        }
      },
    })
  }
}
