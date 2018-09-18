import 'phaser';
const dat = require('dat.gui');

class CameraController extends Phaser.Scene {

    constructor() {
        super('CameraController');
    }

    getCameras() {
        return {
            x: this.cameras.main.scrollX,
            y: this.cameras.main.scrollY,
            zoom: this.cameras.main.zoom
        }
    }

    create() {
        this.graphics = this.add.graphics();

        this.bounds = new Phaser.Geom.Rectangle(0, 0, 1600, 1200);
        this.rect1 = new Phaser.Geom.Rectangle(200, 200, 600, 100);
        this.rect2 = new Phaser.Geom.Rectangle(1010, 800, 60, 300);
        this.circle1 = new Phaser.Geom.Circle(1200, 200, 160);
        this.circle2 = new Phaser.Geom.Circle(400, 900, 80);
        this.triangle1 = new Phaser.Geom.Triangle.BuildEquilateral(800, 500, 200);

        this.text = this.add.text(10, 10, '', {font: '16px Courier', fill: '#00ff00'}).setInteractive();
        let text = this.text;

        this.input.on('pointermove', function (pointer) {

            text.setText([
                'Hours:' + new Date().getHours(),
                'Minutes:' + new Date().getMinutes(),
                'seconds:' + new Date().getSeconds(),
            ]);

            var p = this.cameras.main.getWorldPoint(pointer.x, pointer.y);

            var px = p.x;
            var py = p.y;

            this.hitShape = null;

            if (this.rect1.contains(px, py)) {
                this.hitShape = this.rect1;
            }
            else if (this.rect2.contains(px, py)) {
                this.hitShape = this.rect2;
            }
            else if (this.circle1.contains(px, py)) {
                this.hitShape = this.circle1;
            }
            else if (this.circle2.contains(px, py)) {
                this.hitShape = this.circle2;
            }
            else if (this.triangle1.contains(px, py)) {
                this.hitShape = this.triangle1;
            }

        }, this);

        var cursors = this.input.keyboard.createCursorKeys();

        var controlConfig = {
            camera: this.cameras.main,
            left: cursors.left,
            right: cursors.right,
            up: cursors.up,
            down: cursors.down,
            zoomIn: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q),
            zoomOut: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E),
            acceleration: 0.06,
            drag: 0.0005,
            maxSpeed: 1.0
        };

        this.controls = (Phaser.Cameras.Controls.Smoothed) ? new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig) : new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig);

        var cam = this.cameras.main;
        var gui = new dat.GUI();

        var p1 = gui.addFolder('Pointer');
        p1.add(this.input, 'x').listen();
        p1.add(this.input, 'y').listen();
        p1.open();

        var help = {
            line1: 'Cursors to move',
            line2: 'Q & E to zoom',
            line3: 'Z & X to rotate',
        };

        var f1 = gui.addFolder('Camera');
        f1.add(cam, 'x').listen();
        f1.add(cam, 'y').listen();
        f1.add(cam, 'scrollX').listen();
        f1.add(cam, 'scrollY').listen();
        f1.add(cam, 'zoom', 0.1, 2).step(0.1).listen();
        f1.add(help, 'line1');
        f1.add(help, 'line2');
        f1.add(help, 'line3');
        f1.open();
    }

    update(time, delta) {
        this.controls.update(delta);
    }
}

export default CameraController;

/*

var config = {
    type: Phaser.WEBGL,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    backgroundColor: '#000000',
    scene: {
        create: create,
        update: update
    }
};
*/
