import Content from "../classes/Content"
import Helper from "../classes/Helper"
import Menu from "../classes/Menu"

export default class CreateRoomScene extends Phaser.Scene {
  public content: any
  public helper: any
  public menu: any

  constructor() {
    super("CreateRoomScene")
    this.content = new Content(this)
    this.helper = new Helper(this)
    this.menu = new Menu(this)
  }

  create() {
    this.helper.drawBackground()
    
    this.content.createHeader(`ID комнаты: ${12345}`)
    this.content.createDescription(
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
