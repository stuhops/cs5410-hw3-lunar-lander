let canvas = document.getElementById('canvas-main');
let context = canvas.getContext('2d');

let game = {
  gameHeight: 1024,
  gameWidth: 1024,
  canvas: canvas,
  context: context,

  gravityAcc: 1,

  // ------------ Images ---------------
  imgRocket: './assets/rocket.png',
}



let newGame = (game) => {
  game.rocket = game.createRocket(game.gameWidth / 2, game.gameHeight / 2, game.imgRocket, game.gravityAcc);
  game.gameLoop.start();
}
