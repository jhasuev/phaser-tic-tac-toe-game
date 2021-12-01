import Helper from "../classes/Helper"

export default class StartScene extends Phaser.Scene {
  public helper: any
  
  constructor() {
    super("StartScene")
    this.helper = new Helper(this)
  }

  create() {
    this.helper.drawBackground()
    this.helper.addPulsingText('Нажмите чтобы продолжить')
    this.input.on("pointerdown", this.onTapDown, this)
  }

  onTapDown() {
    this.scene.start('MenuScene')
  }
}
