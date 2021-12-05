import Helper from "../classes/Helper"
import Menu from "../classes/Menu"
import socket from "../socket/"
import ACTIONS from '../socket/actions.json'

export default class RoomsScene extends Phaser.Scene {
  public helper: any
  public menu: any

  constructor() {
    super("RoomsScene")
    this.helper = new Helper(this)
    this.menu = new Menu(this)
    this.init()
  }

  init() {
    socket.on(ACTIONS.ROOM_CREATED, (roomId: number) => {
      console.log('roomId', roomId)
    })
  }

  create() {
    this.helper.drawBackground()
    this.menu.create({
      list: [
        {
          menu: "create-room",
          label: "Создать свою комнату",
          onClick: this.onCreateClick.bind(this)
        },
        {
          menu: "find-room",
          label: "Войти в комнату",
        },
        {
          menu: "back",
          label: "Назад",
        },
      ],
      backScene: "MenuScene"
    })
  }

  onCreateClick() {
    console.log('=>>>>>>>>> onCreateClick');
    console.log('socket =>>>>>>>>>', socket);
    console.log('io =>>>>>>>>>', socket);
    
    socket.emit(ACTIONS.CREATE_ROOM)
  }
}
