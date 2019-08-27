# Demo game Tanks

Game tanks is a Phaser 3 based project with ES6 support via [Babel 7](https://babeljs.io/) and [Webpack 4](https://webpack.js.org/)
that includes hot-reloading for development and production-ready builds.

Loading images via JavaScript module `import` is also supported.

## Game includes following features:
- A map with unlimited area, which means if player keep going to the left of screen, player won’t blocked by the edge of screen, can always keep going.
- Randomly generate hay and wall when player exploring the map, and never totally block any direction by walls.
- Life of hay is 100 health, you can destroy it by bullets, but you can’t destroy the wall.
- We have three tanks: Red, Blue, Green. they can fire bullets.
- Tanks can fire just in one direction - straight forward.
- The damage of bullets for red = 10, blue = 20, Green = 25.
- You can move and rotate the tank using control panel on the screen, but can’t go through blocks.
- Players can changing the tank anytime during gameplay.

Note: You can play on Desktop using WSAD, Space and Tab controlling keys 

## Requirements

[Node.js](https://nodejs.org) is required to install dependencies and run scripts via `npm`.

## Available Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install project dependencies |
| `npm start` | Build project and open web server running project |
| `npm run build` | Builds code bundle with production settings (minification, uglification, etc..) |

## Running Code

After cloning the repo, run `npm install` from your project directory. Then, you can start the local development
server by running `npm start`.


After starting the development server with `npm start`, you can edit any files in the `src` folder
and webpack will automatically recompile and reload your server (available at `http://localhost:8080`
by default).

## Customizing Template

### Babel
You can write modern ES6+ JavaScript and Babel will transpile it to a version of JavaScript that you
want your project to support. The targeted browsers are set in the `.babelrc` file and the default currently
targets all browsers with total usage over "0.25%" but excludes IE11 and Opera Mini.

  ```
  "browsers": [
    ">0.25%",
    "not ie 11",
    "not op_mini all"
  ]
  ```

### Webpack
If you want to customize your build, such as adding a new webpack loader or plugin (i.e. for loading CSS or fonts), you can
modify the `webpack/base.js` file for cross-project changes, or you can modify and/or create
new configuration files and target them in specific npm tasks inside of `package.json'.

## Deploying Code
After you run the `npm run build` command, your code will be built into a single bundle located at 
`dist/bundle.min.js` along with any other assets you project depended. 

If you put the contents of the `dist` folder in a publicly-accessible location (say something like `http://mycoolserver.com`), 
you should be able to open `http://mycoolserver.com/index.html` and play your game.

### Coding Assignment

    1. Please use any javascript game engine to make a game with following features:
    	- A map with unlimited area, which means if player keep going to the left of screen, player won’t blocked by the edge of screen, can always keep going.
    	- Randomly generate hay and wall when player exploring the map, and never totally block any direction by walls.
    	- Life of hay is 100 health, you can destroy it by bullets, but you can’t destroy the wall.
    	- We have three tanks: Red, Blue, Green. they can fire bullets.
    	- Tanks can fire just in one direction - straight forward.
    	- The damage of bullets for red = 10, blue = 20, Green = 25.
    	- You can move and rotate the tank using control panel on the screen, but can’t go through blocks.
    	- Players can changing the tank anytime during gameplay.
    2. Please document your code
    3. Note: please don’t use any plug-in but your game engine. 