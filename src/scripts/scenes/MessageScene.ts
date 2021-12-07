import Content from "../classes/Content"
import Helper from "../classes/Helper"
import Menu from "../classes/Menu"

export default class MessageScene extends Phaser.Scene {
  public content: any
  public helper: any
  public menu: any

  constructor() {
    super("MessageScene")
    this.content = new Content(this)
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
      },
      "game-finished": {
        header: "Ничья",
        text: "Все клетки на поле заполнены.\nНе переживайте, в следующий раз у вас обязательно все получится!",
        list: [
          {
            menu: "menu",
            label: "На главную",
          },
        ],
      },
      "enemy-win": {
        header: "Вы проиграли",
        text: "Увы, но в этот раз выиграл ваш соперник.\nНе переживайте, в следующий раз у вас обязательно все получится!",
        list: [
          {
            menu: "menu",
            label: "На главную",
          },
        ],
      },
      "player-win": {
        header: "Вы выиграли",
        text: "Поздравляем!\nВы одержали победу на вашим соперником!",
        list: [
          {
            menu: "menu",
            label: "На главную",
          },
        ],
      },
      "enemy-losed": {
        header: "Упс...",
        text: "Ваш соперник вышел.\nПопробуйте поиграть с кем-нибудь другим",
        list: [
          {
            menu: "menu",
            label: "На главную",
          },
        ],
      },
    }

    this.content.createHeader(currentMenu[params.type].header)
    this.content.createDescription(currentMenu[params.type].text)

    this.menu.create({
      list: currentMenu[params.type].list,
    })
  }
}
