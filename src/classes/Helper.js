const CONFIGS = {
  styles: {
    header: {
      fontSize: '48px',
      fontFamily: 'Palatino Linotype',
    }
  }
}

export default class Background {
  constructor(scene) {
    this.scene = scene
  }

  drawBackground(color = 0x000000, opacity = .7) {
    this.scene.add.image(0, 0, "bg").setOrigin(0)

    const width = +this.scene.game.config.width
    const height = +this.scene.game.config.height
    this.scene.add.rectangle(0, 0, width, height, color, opacity).setOrigin(0)
  }

  addPulsingText(text, styles = {}) {
    const textObject = this.scene.add.text(+this.scene.game.config.width / 2, +this.scene.game.config.height / 2, text, {
      ...CONFIGS.styles.header,
      ...styles,
    }).setOrigin(.5)

    this.scene.tweens.add({
        targets: [textObject],
        duration: 555,
        scale: 1.25,
        repeat: -1,
        yoyo: true,
    })
  }
}
