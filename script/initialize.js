let canvas = document.getElementById('canvas-main');
let context = canvas.getContext('2d');

let inputBuffer = {};
window.addEventListener('keydown', function(event) {
  inputBuffer[event.key] = event.key;
});
window.addEventListener('keyup', function(event) {
  delete inputBuffer[event.key];
});

let game = {
  gameHeight: 1024,
  gameWidth: 1024,
  canvas: canvas,
  context: context,

  gravityAcc: 0.001,

  // ----------- Controls --------------
  up: 'ArrowUp',
  left: 'ArrowLeft',
  right: 'ArrowRight',

  // ------------ Images ---------------
  imgRocket: './assets/rocket.png',
};


let newGame = (game) => {
  game.rocket = game.createRocket(game.gameWidth / 2, 100, game.imgRocket, game.gravityAcc, context);
  game.gameLoop.start();
}
