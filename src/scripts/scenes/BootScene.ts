export default class BootScene extends Phaser.Scene {
  constructor() {
    super("BootScene")
  }

  preload() {
    this.load.image("bg", "./assets/img/bg.jpg")
  }

  create() {
    this.scene.start("PreloadScene")
  }
}
