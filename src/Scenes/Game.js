/**
 *  Created by Dmytro Parubochyi 2019.08.22
 */

import 'phaser';
import Chunk from '../Entities';
import Player from '../Sprites/Player';
import Bullets from '../Sprites/Bullets';

/**
 * Game/Main scene where all actions take place
 */
export default class GameScene extends Phaser.Scene {
    /**
     * Initial settings before game creation
     */
    init() {
        this.initTank = 2;
        this.currentSpeed = {
            x: 0,
            y: 0
        };
        this.chunkSize = 9;
        this.tileSize = 128;
        this.cameraSpeed = 100;
        this.chunks = [];
        this.changed = true;
        this.playerConfig = [
            {
                playerTank: 0,
                bulletHit: 10
            },
            {
                playerTank: 1,
                bulletHit: 20
            },
            {
                playerTank: 2,
                bulletHit: 25
            }
        ];

    }

    /**
     * Inherit
     */
    preload() {}

    /**
     * Create game objects and initiate game
     */
    create() {
        // listen to resize event
        this.scale.on('resize', this.resize, this);

        // create player
        this.createPlayer();
        // add control
        this.createControl();

        // camera follow the player
        this.cameras.main.startFollow(this.player);
    }

    /**
     * Update game states/objects
     */
    update() {
        // Inputs for desktop
        if (Phaser.Input.Keyboard.JustDown(this.keySpace)) {
            this.handleFire();
        }
        if (Phaser.Input.Keyboard.JustDown(this.keyTab)) {
            this.handleChangeTank();
        }

        // Update map generation
        this.handleMap();
    }

    /**
     * Handle event of player fire
     */
    handleFire() {
        this.bullets.fireBullet(this.player.x, this.player.y, this.player.rotation);
    }

    /**
     * Handle changing of Tank
     * @param num
     */
    handleChangeTank(num) {
        this.player.changeTank(num);
    }

    /**
     * Update map generation (loading and unloading its parts)
     */
    handleMap() {
        // if (this.changed) {
            this.snappedChunkX = (this.chunkSize * this.tileSize) * Math.round(this.player.x / (this.chunkSize * this.tileSize));
            this.snappedChunkY = (this.chunkSize * this.tileSize) * Math.round(this.player.y / (this.chunkSize * this.tileSize));
            this.snappedChunkX = this.snappedChunkX / this.chunkSize / this.tileSize;
            this.snappedChunkY = this.snappedChunkY / this.chunkSize / this.tileSize;
            // this.changed = false;
        // }

        for (let x = this.snappedChunkX - 2; x < this.snappedChunkX + 2; x++) {
            for (let y = this.snappedChunkY - 2; y < this.snappedChunkY + 2; y++) {
                let chunk = this.getChunk(x, y);
                if (chunk == null) {
                    chunk = new Chunk(this, x, y);
                    this.chunks.push(chunk);
                }
            }
        }

        // Logic for load and unload chunks
        for (let i = 0; i < this.chunks.length; i++) {
            let chunk = this.chunks[i];
            // closer parts should be uploaded and distant to be unloaded
            if (Phaser.Math.Distance.Between(
                this.snappedChunkX,
                this.snappedChunkY,
                chunk.x,
                chunk.y
            ) < 2) {
                if (chunk !== null) {
                    chunk.load(this.player);
                }
            } else {
                if (chunk !== null) {
                    chunk.unload();
                }
            }
        }
    }

    /**
     * Create Player
     */
    createPlayer() {
        // create the bullets
        this.bullets = new Bullets(
            this.physics.world,
            this,
            [],
            this.playerConfig,
            this.initTank
        );

        // create player
        this.player = new Player(
            this,
            this.cameras.main.worldView.x + (this.cameras.main.worldView.width * 0.5),
            this.cameras.main.worldView.y + (this.cameras.main.worldView.height * 0.5),
            this.playerConfig[this.initTank].playerTank,
            this.bullets
        );
    }

    /**
     * Return Chunk by numbers in matrix
     * @param x
     * @param y
     * @returns {Chunk}
     */
    getChunk(x, y) {
        let chunk = null;
        for (let i = 0; i < this.chunks.length; i++) {
            if (this.chunks[i].x === x && this.chunks[i].y === y) {
                chunk = this.chunks[i];
            }
        }

        return chunk;
    }

    /**
     * Resize function for game resizing
     * @param gameSize
     * @param baseSize
     * @param displaySize
     * @param resolution
     */
    resize(gameSize, baseSize, displaySize, resolution) {
        let width = gameSize.width;
        let height = gameSize.height;
        if (width === undefined) {
            width = this.sys.game.config.width;
        }
        if (height === undefined) {
            height = this.sys.game.config.height;
        }

        this.cameras.resize(width, height);
    }


    /**
     * Create event listeners for keyboard events (Desktop player control)
     */
    createControl() {
        this.input.keyboard.on('keydown-' + 'W',  () => {
            this.changeVelocity(0, -this.cameraSpeed);
        });
        this.input.keyboard.on('keydown-' + 'S',  () => {
            this.changeVelocity(0, this.cameraSpeed);
        });
        this.input.keyboard.on('keydown-' + 'A',  () => {
            this.changeVelocity(-this.cameraSpeed, 0);
        });
        this.input.keyboard.on('keydown-' + 'D',  () => {
            this.changeVelocity(this.cameraSpeed, 0);
        });

        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.keyTab = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TAB);
    }

    /**
     * Change direction and Tank and Bullets speed by changing X and Y Velocity
     * @param velX
     * @param velY
     */
    changeVelocity(velX, velY) {
        if (velX > 0) {
            this.currentSpeed.x += this.currentSpeed.x >= this.cameraSpeed ? 0 : velX;
        } else if (velX < 0) {
            this.currentSpeed.x += this.currentSpeed.x <= -this.cameraSpeed ? 0 : velX;
        }

        if (velY > 0) {
            this.currentSpeed.y += this.currentSpeed.y >= this.cameraSpeed ? 0 : velY;
        } else if (velY < 0) {
            this.currentSpeed.y += this.currentSpeed.y <= -this.cameraSpeed ? 0 : velY;
        }

        // set Players velocity
        this.player.setVelocity(this.currentSpeed.x, this.currentSpeed.y);
        // rotate Tank's image
        if (this.currentSpeed.x !== 0 || this.currentSpeed.y !== 0) {
            this.player.rotation = Math.atan2(this.currentSpeed.x, -this.currentSpeed.y);
        }
        // this.changed = true;
    }

    /**
     * Change direction and Tank and Bullets speed by using rotationAngle
     * @param rotationAngle
     */
    changeRotation(rotationAngle) {
        this.player.rotation = rotationAngle + Math.PI / 2;
        this.currentSpeed.x = this.cameraSpeed * Math.cos(rotationAngle);
        this.currentSpeed.y = this.cameraSpeed * Math.sin(rotationAngle);
        this.player.setVelocity(this.currentSpeed.x, this.currentSpeed.y);
        // this.changed = true;
    }
}