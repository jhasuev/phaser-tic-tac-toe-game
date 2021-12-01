import 'phaser'
import BootScene from "./scenes/BootScene"
import LoadScene from "./scenes/LoadScene"
import StartScene from "./scenes/StartScene"
import MenuScene from "./scenes/MenuScene"
import RoomsScene from "./scenes/RoomsScene"
import CreateRoomScene from "./scenes/CreateRoomScene"
import GameScene from "./scenes/GameScene"
import FinishScene from "./scenes/FinishScene"

const config = {
    type: Phaser.AUTO,
    backgroundColor: "#f6f6f6",
    width: 800,
    height: 600,
    scene: [
        BootScene,
        LoadScene,
        StartScene,
        MenuScene,
        RoomsScene,
        CreateRoomScene,
        GameScene,
        FinishScene,
    ]
}

const game = new Phaser.Game(config)
