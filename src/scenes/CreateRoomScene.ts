import Helper from "../classes/Helper"
import Menu from "../classes/Menu"

export default class CreateRoomScene extends Phaser.Scene {
  public helper: any
  public menu: any

  constructor() {
    super("CreateRoomScene")
    this.helper = new Helper(this)
    this.menu = new Menu(this)
  }

  create() {
    this.helper.drawBackground()
    
    this.helper.createHeader(`ID комнаты: ${12345}`)
    this.helper.createDescription(
      'Сообщите вашему сопернику ID вашей комнаты\nи начните играть вместе!\n\n\nОжидаем соперника...'
    )

    this.menu.create({
      list: [
        {
          menu: "back",
          label: "Назад",
        },
      ],
      backScene: "RoomsScene"
    })
  }
}
