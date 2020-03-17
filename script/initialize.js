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
  route: 'main-menu',
  // ------------- Canvas --------------
  gameHeight: 1024,
  gameWidth: 1024,
  canvas: canvas,
  context: context,

  // ---------- Game State -------------
  level: 1,
  gameOver: false,
  score: 100,

  // ---------- Game Vars --------------
  gravityAcc: 0.001,

  // --------- High Scores -------------
  highScores: ['Unclaimed', 'Unclaimed', 'Unclaimed', 'Unclaimed'],


  // ----------- Controls --------------
  up: 'ArrowUp',
  left: 'ArrowLeft',
  right: 'ArrowRight',

  // ------------ Images ---------------
  imgRocket: './assets/rocket.png',
};

if(JSON.parse(window.localStorage.getItem('lunar-lander-high-scores')) !== null)
  game.highScores = JSON.parse(window.localStorage.getItem('lunar-lander-high-scores'))
manageHighScores();

function newGame() {
  if(game.terrain) {
    delete game.terrain;
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  game.terrain = game.createTerrain(game);
  game.rocket = game.createRocket(game.gameWidth / 2, 100, game.imgRocket, game.gravityAcc, context);
  game.gameLoop.start();
}
