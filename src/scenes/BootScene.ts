import 'phaser'

export default class BootScene extends Phaser.Scene {
  constructor() {
    super("BootScene")
  }

  create() {
    console.log("BootScene")
    this.scene.start("StartScene")
  }
}
