/**
 *  Created by Dmytro Parubochyi 2019.08.22
 */
import 'phaser';

/**
 * Initial game configuration
 */
export default {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: window.innerWidth,
    height: window.innerHeight,
    pixelArt: true,
    roundPixels: true,
    input: {
        activePointers: 5
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 0,
                x: 0
            },
            debug: false
        }
    }
}