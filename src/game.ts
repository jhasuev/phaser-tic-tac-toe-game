import 'phaser'
import BootScene from "./scenes/BootScene"
import PreloadScene from "./scenes/PreloadScene"
import StartScene from "./scenes/StartScene"
import MenuScene from "./scenes/MenuScene"
import RoomsScene from "./scenes/RoomsScene"
import FindRoomScene from "./scenes/FindRoomScene"
import CreateRoomScene from "./scenes/CreateRoomScene"
import GameScene from "./scenes/GameScene"
import MessageScene from "./scenes/MessageScene"
import FinishScene from "./scenes/FinishScene"

const config = {
    type: Phaser.AUTO,
    transparent: true,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    width: 1280,
    height: 720,
    scene: [
        BootScene,
        PreloadScene,
        StartScene,
        MenuScene,
        RoomsScene,
        FindRoomScene,
        CreateRoomScene,
        GameScene,
        MessageScene,
        FinishScene,
    ]
}

const game = new Phaser.Game(config)
