import Helper from "../classes/Helper"

export default class FindRoomScene extends Phaser.Scene {
  public helper: any
  public closeButton: HTMLDivElement | any
  public inputField: HTMLInputElement | any
  public okButton: HTMLButtonElement | any

  constructor() {
    super("FindRoomScene")
    this.helper = new Helper(this)
  }

  create() {
    this.helper.drawBackground()
    this.helper.showModal("#enter-room-id")
    this.addEvents()
    
    this.inputField = document.querySelector(".js-room-id-field")
  }

  addEvents() {
    this.closeButton = document.querySelector(".js-modals-close")
    this.okButton = document.querySelector(".js-enter-room-btn")

    this.closeButton.onclick = this.onCloseClick.bind(this)
    this.okButton.onclick = this.onOkClick.bind(this)
  }

  onCloseClick() {
    this.closeModal()
    this.scene.start("RoomsScene")
  }

  onOkClick() {
    this.closeModal()
    this.helper.closeModals()
    const roomId: number = parseInt(this.inputField.value)
    if (roomId) {
      const userId = "asdgfhsvo39vrpmsdf;nidlndir"
      // TODO: userId получаем с сервера - будет находится ID сокета
      this.scene.start("GameScene", { type: "pvp", roomId, userId })
    } else {
      // TODO: создать сцену "MessageScene"
      this.scene.start("MessageScene", { type: "wrong-room-id" })
    }
  }

  closeModal() {
    this.sound.play("click")
    this.inputField.value = ''
    this.helper.closeModals()
  }
}
