import Helper from "../classes/Helper"
import Menu from "../classes/Menu"

export default class MenuScene extends Phaser.Scene {
  public helper: any
  public menu: any

  constructor() {
    super("MenuScene")
    this.helper = new Helper(this)
    this.menu = new Menu(this)
  }

  create() {
    this.helper.drawBackground()
    this.menu.create({
      list: [
        {
          menu: "pve",
          label: "Играть с компьютером",
        },
        {
          menu: "pvp",
          label: "Играть с другом",
        },
      ],
    })
  }
}
