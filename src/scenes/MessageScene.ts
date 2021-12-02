import Helper from "../classes/Helper"

export default class MessageScene extends Phaser.Scene {
  public helper: any

  constructor() {
    super("MessageScene")
    this.helper = new Helper(this)
  }

  create(params: object|any) {
    this.helper.drawBackground()

    const currentMenu: object = {
      "wrong-room-id": {
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
        header: "Не правильный ID",
        text: "Вы ввели не правильный или не существующий ID комнаты\nПопробуйте, пожалуйста, еще раз!",
      }
    }

    this.helper.createHeader(currentMenu[params.type].header)
    this.helper.createDescription(currentMenu[params.type].text)

    this.helper.createMenu({
      list: currentMenu[params.type].list,
      onClick: this.menuClick.bind(this)
    })
  }
  
  // TODO: сделать обработчик кликов по меню общим
  menuClick(object: any) {
    switch (object.menu) {
      case 'find-room':
        this.scene.start("FindRoomScene")
        break;

      case 'menu':
        this.scene.start("MenuScene")
        break;
    }
  }
}
