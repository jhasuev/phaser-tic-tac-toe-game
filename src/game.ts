import 'phaser'
import BootScene from "./scenes/BootScene"
import StartScene from "./scenes/StartScene"

const config = {
    type: Phaser.AUTO,
    backgroundColor: "#f6f6f6",
    width: 800,
    height: 600,
    scene: [
        BootScene,
        StartScene,
    ]
}

const game = new Phaser.Game(config)
