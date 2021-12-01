import Helper from "../classes/Helper"

export default class MenuScene extends Phaser.Scene {
  public helper: any

  constructor() {
    super("MenuScene")
    this.helper = new Helper(this)
  }

  create() {
    this.helper.drawBackground()
    this.helper.createMenu({
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
      onClick: this.menuClick.bind(this)
    })
  }

  menuClick(object: any) {
    switch (object.menu) {
      case 'pve':
        this.scene.start("GameScene", { type: "pve" })
        break;

      case 'pvp':
        this.scene.start("RoomsScene")
        break;
    }
  }
}
