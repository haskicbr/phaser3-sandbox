import 'phaser';
import MainController from "./Controllers/MainController";
import CameraController from "./Controllers/CameraController";
import KeyManager from "./KeyManager";

var config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 400,
    height: 300,
    scene: MainController // Можно массив [SceneOne, SceneTwo]
};

class Game extends Phaser.Game {
    constructor(config) {
        super(config);
    }
}

window.game = new Game(config);
