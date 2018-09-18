import "phaser";
import KeyManager from "./../KeyManager";
import CameraController from "./CameraController";

class SceneOne extends Phaser.Scene {
    constructor() {
        super('SceneOne');
        this.position = 1;

    }

    preload() {

    }

    getPosition() {
        return this.position += 10;
    }
}

class MainController extends Phaser.Scene {

    constructor() {
        super("MainController");
    }

    preload() {
        this.text = this.add.text(10, 10, '', {font: '16px Courier', fill: '#00ff00'}).setInteractive();

        this.scene.add('SceneOne', SceneOne, true, {x: 400, y: 300});
        this.scene.launch('SceneOne', SceneOne, true, {x: 400, y: 300});

        this.scene.add('CameraController', CameraController);
        this.scene.launch('CameraController', CameraController);

        console.log('MAIN CONTROLLER PRELOAD');

    }

    create(data) {


        this.input.keyboard.once('keyup_ONE', function () {
            //this.scene.start('KeyManager');
        }, this);

        console.log(' scene one create ', data);

        var sprite = this.add.sprite(200, 200, 'eye').setInteractive();

        let text = this.text;

        sprite.on('pointerdown', function (pointer) {
            text.setText([
                'Hours:' + new Date().getHours(),
                'Minutes:' + new Date().getMinutes(),
                'seconds:' + new Date().getSeconds(),
            ]);

            this.setTint(0xff0000);
        });

        sprite.on('pointerout', function (pointer) {
            this.clearTint();
        });

        sprite.on('pointerup', function (pointer) {
            this.clearTint();
        });
    }

    update(data) {
        let SceneOne = this.scene.get('SceneOne');
        let Cameras = this.scene.get('CameraController');

        let position = SceneOne.getPosition();

        let pointers = Cameras.getCameras();

        this.cameras.main.scrollX = pointers.x;
        this.cameras.main.scrollY = pointers.y;
        this.cameras.main.zoom = pointers.zoom;
    }
}

export default MainController;