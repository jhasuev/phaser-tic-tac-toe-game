import Preloader from "../classes/Preloader"

export default class LoadScene extends Phaser.Scene {
  constructor() {
    super("LoadScene")
  }

  preload() {
    this.add.image(0, 0, "bg").setOrigin(0)
    this.load.image("o1", "./assets/img/icons/o1.png")
    this.load.image("o2", "./assets/img/icons/o2.png")
    this.load.image("o3", "./assets/img/icons/o3.png")
    this.load.image("x1", "./assets/img/icons/x1.png")
    this.load.image("x2", "./assets/img/icons/x2.png")
    this.load.image("x3", "./assets/img/icons/x3.png")

    this.load.audio("bg", "./assets/audio/bg.ogg")
    this.load.audio("click", "./assets/audio/click.ogg")
    this.load.audio("enter-o", "./assets/audio/enter-o.ogg")
    this.load.audio("enter-x", "./assets/audio/enter-x.ogg")

    new Preloader(this)
  }

  create() {
    this.sound.play("bg", { volume: .25, loop: true })

    this.time.addEvent({
      // для красоты
      delay: 2000,
      callback: () => {
        this.scene.start("StartScene")
      },
    });
  }
}
