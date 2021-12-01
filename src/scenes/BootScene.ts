import 'phaser'

export default class BootScene extends Phaser.Scene {
  constructor() {
    super("BootScene")
  }

  preload() {
    // TODO: загрузка фона
    console.log("BootScene")
  }

  create() {
    // TODO: переключения на сцену "LoadScene"
    this.scene.start("LoadScene")
  }
}
