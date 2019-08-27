/**
 *  Created by Dmytro Parubochyi 2019.08.25
 */
import 'phaser';

/**
 * Bullets group is used for handling issues with many items
 */
export default class Bullets extends Phaser.Physics.Arcade.Group {
    constructor (world, scene, children, config, num) {
        super(world, scene, children);
        this.scene = scene;
        this.world = world;
        this.config = config;
        this.setConfig(num);
        // TODO: set it from config
        this.bulletSpeed = 300;

        // TODO: should be overridden with creating Bullet class that extends Phaser.Physics.Arcade.Sprite
        this.createMultiple({
            overridden: Phaser.Physics.Arcade.Sprite,
            quantity: 5,
            key: 'bullet',
            active: false,
            visible: false
        });
        // show bullets on higher levels
        this.setDepth(1, 0);
        // enable physics for this group
        this.world.enable(this.getChildren());
    }

    /**
     * Handle changing of current bullet config
     * @param num
     */
    setConfig(num) {
        this.currentConfig = this.config[num];
        this.amount = this.currentConfig.bulletHit;
    }

    /**
     * Handle collision of bullet to enemy
     * @param bullet
     * @param enemy
     */
    enemyCollision(bullet, enemy) {
        bullet.body.enable = false;
        bullet.visible = false;
        bullet.active = false;
        enemy.loseHealth(this.amount);
    }

    /**
     * Start bullets' movement using direction (rotation) and initial point (x and y)
     * @param x
     * @param y
     * @param rotation
     */
    fireBullet(x, y, rotation) {
        let bullet = this.getFirstDead(true);
        if (bullet && bullet.body) {
            // destroy the timer if it exists
            if (bullet.timerToDie) {
                bullet.timerToDie.destroy();
            }
            bullet.setPosition(x, y);
            // // should be enabled to make collisions
            bullet.body.enable = true;
            bullet.visible = true;
            bullet.active = true;

            // bullet.setScale(this.amount/10);

            // handle speed and image rotation
            bullet.body.setVelocity(
                Math.round(this.bulletSpeed * Math.sin(rotation)),
                Math.round(-this.bulletSpeed * Math.cos(rotation))
            );
            bullet.rotation = rotation;

            // destroy bullet after 1500 ms
            bullet.timerToDie = this.scene.time.addEvent({
                delay: 1500,
                callback: () => {
                    bullet.body.enable = false;
                    bullet.visible = false;
                    bullet.active = false;
                    bullet.body.setVelocity(0);
                }
            });
        } else if (bullet && !bullet.body) {
            // TODO: find out why this is necessary for fixing "initial bullet" issue: see overridden of Bullet's class
            bullet.destroy();
        }
    }
}