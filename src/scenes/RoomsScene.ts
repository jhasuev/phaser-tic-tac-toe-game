import Helper from "../classes/Helper"

export default class RoomsScene extends Phaser.Scene {
  public helper: any

  constructor() {
    super("RoomsScene")
    this.helper = new Helper(this)
  }

  create() {
    this.helper.drawBackground()
    this.helper.createMenu({
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
      onClick: this.menuClick.bind(this)
    })
  }

  menuClick(object: any) {
    switch (object.menu) {
      case 'create-room':
        this.scene.start("CreateRoomScene")
        break;

      case 'find-room':
        this.scene.start("FindRoomScene")
        break;

      case 'back':
        this.scene.start("MenuScene")
        break;
    }
  }
}
