import configs from "../configs";
const { STYLES, MENU } = configs

export default class Menu {
  public scene: any
  public backScene: string

  constructor(scene: any|object) {
    this.scene = scene
  }

  create(params: object|any) {
    this.backScene = params.backScene || "MenuScene"

    params.list.forEach((button: object|any, index: number) => {
      const x: number = (this.scene.game.config.width - MENU.bg.width) / 2
      const y: number = MENU.startY + ((MENU.bg.height + MENU.offset) * index) + (+params.startY || 0)

      this.createMenuItemBackground(button, x, y)
      this.createMenuItemText(button.label, y)
    })
    
    this.scene.input.on("gameobjectdown", (pointer: object, button: any) => {
      this.scene.sound.play("click")
      const callback: Function = button.onClick || params.onClick || this.onClick.bind(this)
      callback(button.menu)
    })
  }

  onClick(menu: string) {
    switch (menu) {
      case 'pve':
        this.scene.scene.start("GameScene", { type: "pve" })
        break;

      case 'pvp':
        this.scene.scene.start("RoomsScene")
        break;
      
      case 'create-room':
        this.scene.scene.start("RoomScene")
        break;

      case 'find-room':
        this.scene.scene.start("FindRoomScene")
        break;

      case 'menu':
        this.scene.scene.start("MenuScene")
        break;

      case 'back':
        this.scene.scene.start(this.backScene)
        break;
    }
  }

  createMenuItemBackground(button: object| any, x: number, y: number) {
    button.rectangle = this.scene.add.rectangle(
      x,
      y,
      MENU.bg.width,
      MENU.bg.height,
      MENU.bg.color,
    )
    button.rectangle.setInteractive()
    button.rectangle.setOrigin(0)
    button.rectangle.menu = button.menu
    button.rectangle.onClick = button.onClick
  }

  createMenuItemText(text: string, y: number) {
    this.scene.add.text(
      +this.scene.game.config.width / 2,
      y + MENU.bg.height / 2,
      text,
      STYLES.menu
    ).setOrigin(.5)
  }
}
