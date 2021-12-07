import 'phaser'
import BootScene from "./scenes/BootScene"
import PreloadScene from "./scenes/PreloadScene"
import StartScene from "./scenes/StartScene"
import MenuScene from "./scenes/MenuScene"
import RoomsScene from "./scenes/RoomsScene"
import FindRoomScene from "./scenes/FindRoomScene"
import RoomScene from "./scenes/RoomScene"
import GameScene from "./scenes/GameScene"
import MessageScene from "./scenes/MessageScene"

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
        RoomScene,
        GameScene,
        MessageScene,
    ]
}

const game = new Phaser.Game(config)
