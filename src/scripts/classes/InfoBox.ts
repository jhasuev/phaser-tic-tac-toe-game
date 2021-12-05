// import configs from "../configs"
// const { GAME } = configs

export default class InfoBox {
  public scene: any
  public queueTextObj: any

  constructor(scene: any) {
    this.scene = scene
    this.init()
  }
  
  init() {
    this.addInfoBox()
    this.queueTextObj = this.scene.add.text(20, 20, '', { color: '#000', fontSize: '20px' })
    this.updateQueue()
  }

  addInfoBox() {
    this.scene.add.rectangle(0, 0, 420, 110, 0xffffff, .75)
  }

  updateQueue() {
    this.queueTextObj.setText(`Ход: ${this.getQueueLabel(this.scene.queueId)}`)
  }

  getQueueLabel(queueId: string): string {
    return {
      [this.scene.enemy.id]: "Противника",
      [this.scene.player.id]: "Ваш",
    }[queueId] || ''
  }
}
