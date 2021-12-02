import Helper from "../classes/Helper"
import Menu from "../classes/Menu"

export default class MessageScene extends Phaser.Scene {
  public helper: any
  public menu: any

  constructor() {
    super("MessageScene")
    this.helper = new Helper(this)
    this.menu = new Menu(this)
  }

  create(params: object|any) {
    this.helper.drawBackground()

    const currentMenu: object = {
      "wrong-room-id": {
        header: "Не правильный ID",
        text: "Вы ввели не правильный или не существующий ID комнаты\nПопробуйте, пожалуйста, еще раз!",
        list: [
          {
            menu: "find-room",
            label: "Попробовать еще",
          },
          {
            menu: "menu",
            label: "На главную",
          },
        ],
      }
    }

    this.helper.createHeader(currentMenu[params.type].header)
    this.helper.createDescription(currentMenu[params.type].text)

    this.menu.create({
      list: currentMenu[params.type].list,
    })
  }
}
