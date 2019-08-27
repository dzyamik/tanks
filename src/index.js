/**
 *  Created by Dmytro Parubochyi 2019.08.22
 */
import 'phaser';
import config from './config';
import GameScene from './Scenes/Game';
import BootScene from './Scenes/Boot';
import UIScene from './Scenes/UI';

/**
 * Base game class
 */
class Game extends Phaser.Game {
    constructor() {
        super(config);
        // add all scenes to game
        this.scene.add('Game', GameScene);
        this.scene.add('Boot', BootScene);
        this.scene.add('UI', UIScene);
        // start loader
        this.scene.start('Boot');
    }
}

/**
 * Create game
 * @type {Game}
 */
window.game = new Game();

/**
 * Add listener for game resizing on window resizing
 */
window.addEventListener('resize', (event) => {
    game.scale.resize(window.innerWidth, window.innerHeight);
});