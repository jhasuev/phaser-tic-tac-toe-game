import configs from "../configs";
const { STYLES, CONTENT } = configs

export default class Content {
  public scene: any

  constructor(scene: object) {
    this.scene = scene
  }

  addPulsingText(text: string, styles:object = {}) {
    const textObject = this.scene.add.text(+this.scene.game.config.width / 2, +this.scene.game.config.height / 2, text, {
      ...STYLES.pulseHeader,
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

  createHeader(text: string) {
    this.scene.add.text(
      +this.scene.game.config.width / 2,
      CONTENT.header.offsetY,
      text,
      STYLES.header
    ).setOrigin(.5, 0)
  }

  createDescription(text: string) {
    this.scene.add.text(
      +this.scene.game.config.width / 2,
      CONTENT.text.offsetY,
      text,
      STYLES.text
    ).setOrigin(.5, 0)
  }
}
