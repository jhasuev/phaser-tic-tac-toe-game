export default class Preloader {
  constructor(scene) {
    this.scene = scene
    this.init()
  }

  init() {
    this.createLoader()
    this.createEvents()
  }

  createLoader() {
    this.width = 500
    this.height = 50
    this.offsetY = 70
    this.x = +this.scene.game.config.width / 2 - this.width / 2
    this.y = +this.scene.game.config.height - (this.height / 2) - this.offsetY

    this.back = this.scene.add.rectangle(this.x, this.y, this.width, this.height, 0x000000, .8).setOrigin(0)
    this.front = this.scene.add.rectangle(this.x, this.y, 50, this.height, 0xFFFFFF, .8).setOrigin(0)
  }

  update(progress) {
    this.front.width = progress * this.width
  }
  
  createEvents() {
    this.scene.load.on("progress", progress => {
      this.update(progress)
    })

    this.scene.load.on("complete", () => {
      this.back.destroy()
      this.front.destroy()
    })
  }
}