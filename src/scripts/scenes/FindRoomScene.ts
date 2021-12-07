import Helper from "../classes/Helper"
import socket from "../socket/"
import ACTIONS from '../socket/actions.json'

export default class FindRoomScene extends Phaser.Scene {
  public helper: any
  public closeButton: HTMLDivElement | any
  public inputField: HTMLInputElement | any
  public okButton: HTMLButtonElement | any

  constructor() {
    super("FindRoomScene")
    this.helper = new Helper(this)
  }

  init() {
    socket.once(ACTIONS.WRONG_ROOM, this.onWrongRoom.bind(this))
    socket.once(ACTIONS.INIT_GAME, (data: any) => {
      this.scene.start("GameScene", { type: "pvp", data })
      this.closeModal()
    })
  }

  create() {
    this.helper.drawBackground()
    this.helper.showModal("#enter-room-id")
    this.addEvents()
    
    this.inputField = document.querySelector(".js-room-id-field")
    this.inputField?.focus?.()
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
    const roomId: number = parseInt(this.inputField.value)
    if (roomId) {
      socket.emit(ACTIONS.ENTER_ROOM, roomId)
    } else {
      this.onWrongRoom()
    }
  }

  onWrongRoom() {
    this.closeModal()
    this.scene.start("MessageScene", { type: "wrong-room-id" })
  }

  closeModal() {
    this.sound.play("click")
    this.inputField.value = ''
    this.helper.closeModals()
  }
}
