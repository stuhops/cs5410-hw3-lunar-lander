// TODO: Create terrain correctly


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
  levels: 2,
  gameOver: false,
  score: 100,

  // ---------- Game Vars --------------
  gravityAcc: 0.001,

  // --------- High Scores -------------
  highScores: ['Unclaimed', 'Unclaimed', 'Unclaimed', 'Unclaimed', 'Unclaimed'],


  // ----------- Controls --------------
  up: 'ArrowUp',
  left: 'ArrowLeft',
  right: 'ArrowRight',

  // ------------ Audio ----------------
  audio: {
    thrust: './assets/thrust.mp3',
    blowUp: './assets/explosion.mp3',
    win: './assets/win.mp3',
  },

  // ------------ Images ---------------
  imgRocket: './assets/rocket.png',
};

if(JSON.parse(window.localStorage.getItem('lunar-lander-high-scores')) !== null)
  game.highScores = JSON.parse(window.localStorage.getItem('lunar-lander-high-scores'));
manageHighScores();

if(JSON.parse(window.localStorage.getItem('lunar-lander-controls')) !== null) {
  game.up = JSON.parse(window.localStorage.getItem('lunar-lander-controls')).up;
  game.left = JSON.parse(window.localStorage.getItem('lunar-lander-controls')).left;
  game.right = JSON.parse(window.localStorage.getItem('lunar-lander-controls')).right;
}

document.getElementById('control-up').innerHTML = game.up;
document.getElementById('control-left').innerHTML = game.left;
document.getElementById('control-right').innerHTML = game.right;

function newGame() {
  if(game.terrain) {
    delete game.terrain;
    delete game.rocket;
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  game.terrain = game.createTerrainRMD(game);
  game.rocket = game.createRocket(game.gameWidth / 2, 100, game.imgRocket, game.gravityAcc, context);
  game.gameLoop.start();
}
