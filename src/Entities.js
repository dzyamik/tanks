/**
 *  Created by Dmytro Parubochyi 2019.08.22
 */
import 'phaser';

/**
 * Create random map tiles around visible area
 */
export default class Chunk {
    /**
     * Create and add chunk with tiles to scene, use matrix numbers x and y
     * @param scene
     * @param x
     * @param y
     */
    constructor(scene, x, y) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        // group of bg elements
        this.tiles = this.scene.add.group();
        this.blockedLayer = this.scene.add.group();
        this.isLoaded = false;
    }

    /**
     * Clear chunk tiles (free memory)
     */
    unload() {
        if (this.isLoaded) {
            this.tiles.clear(true, true);
            this.blockedLayer.clear(true, true);
            this.isLoaded = false;
        }
    }

    /**
     * Construct random tiles for chunks that are around visible one and make blockers
     */
    load(player) {
        if (!this.isLoaded) {
            for (let x = 0; x < this.scene.chunkSize; x++) {
                for (let y = 0; y < this.scene.chunkSize; y++) {
                    let tileX = (this.x * (this.scene.chunkSize * this.scene.tileSize)) + (x * this.scene.tileSize);
                    let tileY = (this.y * (this.scene.chunkSize * this.scene.tileSize)) + (y * this.scene.tileSize);
                    let randomValue = Math.random();
                    let key = 'earth';
                    let blocker = false;
                    let destroyable = false;
                    if (randomValue > 0.9) {
                        key = 'wall';
                        blocker = true;
                    } else if (randomValue > 0.8) {
                        key = 'hay';
                        blocker = true;
                        destroyable = true;
                    }

                    this.tiles.add(new Tile(this.scene, tileX, tileY, 'earth'));
                    if (blocker) {
                        let tile = null;
                        if (destroyable) {
                            tile = new Enemy(this.scene, tileX, tileY, key);
                        } else {
                            tile = new Tile(this.scene, tileX, tileY, key);
                        }
                        this.blockedLayer.add(tile);
                        this.scene.physics.add.existing(tile, true);
                        // add blockers for player
                        this.scene.physics.add.collider(player, tile);
                        // initial overlap will destroy any blockers under Player
                        this.scene.physics.add.overlap(player, tile, (pl, tl) => {
                            if (tl.health) {
                                tl.loseHealth();
                            } else {
                                tl.destroy(true);
                            }

                        }, null, this);
                        // make bullet-blocker collision
                        this.scene.physics.add.collider(player.bullets, tile, (bl, tl) => {
                            player.bullets.enemyCollision(tl, bl);
                        });
                    }
                }
            }
            this.isLoaded = true;
        }
    }
}

/**
 * Add tile to scene on creation, extends Sprite class
 */
class Tile extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, key) {
        super(scene, x, y, key);
        this.scene = scene;
        this.scene.add.existing(this);
        this.setOrigin(0);
    }

    // TODO: override part with loseHealth
    loseHealth() {}
}

/**
 * Class for destroyable blockers
 */
class Enemy extends Tile {
    constructor (scene, x, y, key) {
        super(scene, x, y, key);
        this.health = 100;

        // create explosion animation
        if (!this.scene.anims.get('explosion')) {
            this.anim = this.scene.anims.create({
                key: 'explosion',
                frames: this.scene.anims.generateFrameNumbers('explosion', {}),
                frameRate: 25,
                repeat: 0,
                hideOnComplete: true,
                showOnStart: true,
                paused: true
            });
        }

        // add sprite
        this.sprite = this.scene.add.sprite(this.x + this.width / 2, this.y + this.height / 2, 'explosion');
        this.sprite.setScale(2, 2);
        this.sprite.visible = false;
        // add animation to sprite
        this.sprite.anims.load('explosion');
    }

    /**
     * Lose HP or be destroyed
     * @param ammount
     */
    loseHealth(ammount) {
        if (ammount) {
            this.health -= ammount;
        } else {
            this.health = 0;
        }
        if (this.health <= 0) {
            this.sprite.anims.play('explosion');
            this.destroy();
        }
    }
}

