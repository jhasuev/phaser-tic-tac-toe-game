export default class Background {
  public scene: any
  public modals: HTMLDivElement| any

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

  showModal(modalSelector: string) {
    this.closeModals()
    this.modals.style.display = "block"

    const currentModal: HTMLDivElement|any = document.querySelector(modalSelector)
    currentModal.style.display = "block"
  }

  closeModals() {
    this.modals.style.display = "none"
    Array.from(document.querySelectorAll(".js-modal-item")).forEach((modal: HTMLDivElement|any) => {
      modal.style.display = "none"
    })
  }
}
