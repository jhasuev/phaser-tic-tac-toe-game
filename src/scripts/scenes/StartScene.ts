import Content from "../classes/Content"
import Helper from "../classes/Helper"

export default class StartScene extends Phaser.Scene {
  public content: any
  public helper: any
  
  constructor() {
    super("StartScene")
    this.helper = new Helper(this)
    this.content = new Content(this)
  }

  create() {
    this.helper.drawBackground()
    this.content.addPulsingText('Нажмите чтобы продолжить')
    this.input.on("pointerdown", this.onTapDown, this)
  }

  onTapDown() {
    this.sound.play("click")
    this.scene.start('MenuScene')
  }
}
