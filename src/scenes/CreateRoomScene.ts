import Helper from "../classes/Helper"

export default class CreateRoomScene extends Phaser.Scene {
  public helper: any

  constructor() {
    super("CreateRoomScene")
    this.helper = new Helper(this)
  }

  create() {
    this.helper.drawBackground()
    
    this.helper.createHeader(`ID комнаты: ${12345}`)
    this.helper.createDescription(
      'Сообщите вашему сопернику ID вашей комнаты\nи начните играть вместе!\n\n\nОжидаем соперника...'
    )

    this.helper.createMenu({
      list: [
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
      case 'back':
        this.scene.start("RoomsScene")
        break;
    }
  }
}
