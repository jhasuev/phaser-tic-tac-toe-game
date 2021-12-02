import Helper from "../classes/Helper"
import Menu from "../classes/Menu"

export default class RoomsScene extends Phaser.Scene {
  public helper: any
  public menu: any

  constructor() {
    super("RoomsScene")
    this.helper = new Helper(this)
    this.menu = new Menu(this)
  }

  create() {
    this.helper.drawBackground()
    this.menu.create({
      list: [
        {
          menu: "create-room",
          label: "Создать свою комнату",
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
}
