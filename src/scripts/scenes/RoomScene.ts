import Content from "../classes/Content"
import Helper from "../classes/Helper"
import Menu from "../classes/Menu"
import socket from "../socket"
import ACTIONS from '../socket/actions.json'

export default class RoomScene extends Phaser.Scene {
  public content: any
  public helper: any
  public params: any
  public menu: any

  constructor() {
    super("RoomScene")
    this.content = new Content(this)
    this.helper = new Helper(this)
    this.menu = new Menu(this)
  }

  init() {
    socket.once(ACTIONS.INIT_GAME, (data: any) => {
      this.scene.start("GameScene", { type: "pvp", data })
    })
  }

  create(params: any = {}) {
    this.params = params
    this.helper.drawBackground()
    
    // TODO: копировать в буфер ID при клике на хедер
    this.content.createHeader(`ID комнаты: ${params.room.id}`)
    this.content.createDescription(
      'Сообщите вашему сопернику ID вашей комнаты\nи начните играть вместе!\n\n\nОжидаем соперника...'
    )

    this.menu.create({
      list: [
        {
          menu: "back",
          label: "Назад",
          onClick: this.onBackClick.bind(this)
        },
      ],
      backScene: "RoomsScene"
    })
  }

  onBackClick() {
    socket.emit(ACTIONS.REMOVE_ROOM, this.params.room.id)
    this.scene.start("RoomsScene")
  }
}
