import _configs from "../configs";
const { STYLES, CONTENT } = _configs

export default class Background {
  public scene: any
  public modals: HTMLDivElement

  constructor(scene: object) {
    this.scene = scene
    this.init()
  }

  init() {
    this.modals = document.querySelector("#modals")
  }

  drawBackground(color = 0x000000, opacity = .7) {
    this.scene.add.image(0, 0, "bg").setOrigin(0)

    const width = +this.scene.game.config.width
    const height = +this.scene.game.config.height
    this.scene.add.rectangle(0, 0, width, height, color, opacity).setOrigin(0)
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

  showModal(modalSelector: string) {
    this.closeModals()
    this.modals.style.display = "block"

    const currentModal: HTMLDivElement = document.querySelector(modalSelector)
    currentModal.style.display = "block"
  }

  closeModals() {
    this.modals.style.display = "none"
    Array.from(document.querySelectorAll(".js-modal-item")).forEach((modal: HTMLDivElement) => {
      modal.style.display = "none"
    })
  }
}
