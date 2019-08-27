/**
 *  Created by Dmytro Parubochyi 2019.08.22
 */
import 'phaser';

/**
 *
 */
export default class BootScene extends Phaser.Scene {
    /**
     * load all assets for game
     */
    preload() {
        this.load.spritesheet('explosion', 'assets/explosion.png', {
            frameWidth: 64,
            frameHeight: 64
        });
        this.load.spritesheet('tanks', 'assets/tanks.png', {
            frameWidth: 54,
            frameHeight: 57
        });
        this.load.image('earth', 'assets/earth.jpg');
        this.load.image('wall', 'assets/wall.jpg');
        this.load.image('hay', 'assets/hay.jpg');
        this.load.image('bullet', 'assets/bullet.png');
    }

    /**
     * Start scene Game (main scene)
     */
    create() {
        this.scene.start('Game');
    }
}