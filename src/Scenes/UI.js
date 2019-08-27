/**
 *  Created by Dmytro Parubochyi 2019.08.22
 */
import 'phaser';

/**
 * UI scene for control info
 */
export default class UIScene extends Phaser.Scene {
    constructor () {
        super({ key: 'UI', active: true });
    }

    /**
     * Initial settings before game creation
     */
    init () {
        this.checkInitTank = true;
        // create fire zone
        this.fireZoneRadius = 128;
    }

    /**
     * Load some textures for UI
     */
    preload() {
        this.load.image('ball', 'assets/ball.png');
        this.load.spritesheet('tanks2', 'assets/tanks.png', {
            frameWidth: 54,
            frameHeight: 57
        });
    }

    /**
     * Create UI and UI logic/control
     */
    create () {
        this.scale.on('resize', this.resize, this);
        // uncomment to use it for Desktop
        // this.controlText = this.add.text(12, 12, 'Move: WASD; Shoot: Space; Change Tank: Tab', {
        //     textAlign: "center",
        //     fontSize: '20px',
        //     fill: '#ffffff'
        // });

        // get access to main/game scene
        this.mainScene = this.scene.get('Game');

        // create tap zone to initiate fire
        this.fireZone = this.add.sprite(window.innerWidth - this.fireZoneRadius, window.innerHeight - this.fireZoneRadius, 'ball');
        this.fireZone.setInteractive();
        this.fireZone.tint = 0x00ffff;
        this.fireZone.on('pointerdown', () => {
            this.fireZone.tint = 0xff00ff;
            this.mainScene.handleFire();
        });
        this.fireZone.on('pointerup', () => {
            this.fireZone.tint = 0x00ffff;
        });

        // create control zone to control tank
        this.controlZone = this.add.sprite(this.fireZoneRadius, window.innerHeight - this.fireZoneRadius, 'ball');
        this.controlZone.setInteractive();
        this.controlZone.on('pointermove', (pointer, localX, localY, event) => {
            this.mainScene.changeRotation(Math.PI / 2 + Math.atan2(this.controlZone.x - pointer.x, pointer.y - this.controlZone.y));
        });
        this.controlZone.on('pointerout', () => {
            this.mainScene.player.setVelocity(0);
        });

        // change tank Zone
        // TODO: could be optimized
        this.tank0 = this.add.sprite(window.innerWidth / 2 - this.fireZoneRadius / 2, this.fireZoneRadius / 2, 'tanks2', 0);
        this.tank1 = this.add.sprite(window.innerWidth / 2, this.fireZoneRadius / 2, 'tanks2', 1);
        this.tank2 = this.add.sprite(window.innerWidth / 2 + this.fireZoneRadius / 2, this.fireZoneRadius / 2, 'tanks2', 2);

        this.tank0.setInteractive();
        this.tank1.setInteractive();
        this.tank2.setInteractive();

        this.tank0.alpha = 0.6;
        this.tank1.alpha = 0.6;
        this.tank2.alpha = 0.6;

        this.tank0.on('pointerdown', () => {
            this.tank0.alpha = 0.95;
            this.tank1.alpha = 0.6;
            this.tank2.alpha = 0.6;

            this.mainScene.handleChangeTank(0);
        });
        this.tank1.on('pointerdown', () => {
            this.tank0.alpha = 0.6;
            this.tank1.alpha = 0.95;
            this.tank2.alpha = 0.6;

            this.mainScene.handleChangeTank(1);
        });
        this.tank2.on('pointerdown', () => {
            this.tank0.alpha = 0.6;
            this.tank1.alpha = 0.6;
            this.tank2.alpha = 0.95;

            this.mainScene.handleChangeTank(2);
        });

    }

    /**
     * Update is necessary only for initial synchronization
     */
    update() {
        if (this.checkInitTank && this.mainScene.initTank !== undefined) {
            this['tank' + this.mainScene.initTank].alpha = 0.9;
            this.checkInitTank = false;
        }
    }

    /**
     * Handle changing of screen size
     */
    resize() {
        this.controlZone.setPosition(this.fireZoneRadius, window.innerHeight - this.fireZoneRadius / 2);
        this.tank0.setPosition(window.innerWidth / 2 - this.fireZoneRadius / 2, this.fireZoneRadius / 2);
        this.tank1.setPosition(window.innerWidth / 2, this.fireZoneRadius / 2);
        this.tank2.setPosition(window.innerWidth / 2 + this.fireZoneRadius / 2, this.fireZoneRadius / 2);
        this.fireZone.setPosition(window.innerWidth - this.fireZoneRadius, window.innerHeight - this.fireZoneRadius / 2);
    }
};
