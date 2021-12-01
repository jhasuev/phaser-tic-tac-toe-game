const CONFIGS = {
  styles: {
    pulseHeader: {
      fontSize: '48px',
      fontFamily: 'Palatino Linotype',
    },
    header: {
      offsetY: 80,
      fontSize: '40px',
      fontFamily: 'Palatino Linotype',
    },
    text: {
      offsetY: 40 + 80 + 30,
      fontSize: '26px',
      fontFamily: 'Palatino Linotype',
      textAlign: "center",
      align: "center",
    },
    menu: {
      offset: 20,
      startY: 720 / 2,
      text: {
        fontSize: '32px',
        fontFamily: 'Palatino Linotype',
        fill: '#333333',
      },
      bg: {
        color: 0xFFFFFF,
        width: 400,
        height: 50,
      },
    },
  }
}

export default class Background {
  public scene: any

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
      ...CONFIGS.styles.pulseHeader,
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
      CONFIGS.styles.header.offsetY,
      text,
      CONFIGS.styles.header
    ).setOrigin(.5, 0)
  }

  createDescription(text: string) {
    this.scene.add.text(
      +this.scene.game.config.width / 2,
      CONFIGS.styles.text.offsetY,
      text,
      CONFIGS.styles.text
    ).setOrigin(.5, 0)
  }

  createMenu(params) {
    params.list.forEach((button, index) => {
      const x = (this.scene.game.config.width - CONFIGS.styles.menu.bg.width) / 2
      const y = CONFIGS.styles.menu.startY + ((CONFIGS.styles.menu.bg.height + CONFIGS.styles.menu.offset) * index)

      this.createMenuBackground(button, x, y)
      this.createMenuText(button.label, y)
    })
    
    this.scene.input.on("gameobjectdown", (pointer, object) => {
      this.scene.sound.play("click")
      params.onClick(object)
    })
  }

  createMenuBackground(button, x, y) {
    button.rectangle = this.scene.add.rectangle(
      x,
      y,
      CONFIGS.styles.menu.bg.width,
      CONFIGS.styles.menu.bg.height,
      CONFIGS.styles.menu.bg.color,
    )
    button.rectangle.setInteractive()
    button.rectangle.setOrigin(0)
    button.rectangle.menu = button.menu
  }

  createMenuText(text, y) {
    this.scene.add.text(
      +this.scene.game.config.width / 2,
      y + CONFIGS.styles.menu.bg.height / 2,
      text,
      CONFIGS.styles.menu.text
    ).setOrigin(.5)
  }
}
