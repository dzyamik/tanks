/**
 *  Created by Dmytro Parubochyi 2019.08.22
 */
import 'phaser';

/**
 * Player class - make main logic for player
 */
export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor (scene, x, y, tankFrame, bullets) {
        super(scene, x, y, 'tanks', tankFrame);
        this.bullets = bullets;
        this.scene = scene;

        // enable physics
        this.scene.physics.world.enable(this);
        // add our player to the scene
        this.scene.add.existing(this);
        this.setDepth(1);
        this.setTank(tankFrame);
    }

    /**
     * Change tank's config
     * @param num
     */
    changeTank(num) {
        if (num > -1 && num < 3) {
            this.setTank(num);
        } else if (this.currentTank >= 2) {
            this.setTank(0);
        } else {
            this.setTank(this.currentTank + 1);
        }
    }

    /**
     * Set exact config
     * @param num
     */
    setTank(num) {
        this.currentTank = num;
        this.setFrame(num);
        this.bullets.setConfig(num);
    }
}