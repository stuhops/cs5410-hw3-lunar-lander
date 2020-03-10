game.gameLoop = function() {
  let lastTime = performance.now();

  function processInput() {
    game.rocket.setThrust(false);
    game.rocket.setRotate(0);

    for(input in inputBuffer) {
      if(input == game.up) {
        game.rocket.setThrust(true);
      }
      if(input == game.left) {
        game.rocket.setRotate(-1);
      }
      if(input == game.right) {
        game.rocket.setRotate(1);
      }
    }
  }


  function update(elapsedTime) {
    game.rocket.update(elapsedTime);

    if(game.rocket.getCenter().y > 1024) {
      // game.gameOver = true;
    }
  }


  function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    game.rocket.render(context)
  }


  function gameLoop(time) {
    let elapsedTime = time - lastTime;

    processInput();
    update(elapsedTime);
    render(elapsedTime);

    if(!game.gameOver) {
      lastTime = time;
      requestAnimationFrame(gameLoop);
    }
  }

  function startGameLoop() {
    lastTime = performance.now();
    requestAnimationFrame(gameLoop);
  }

  return {
    start: startGameLoop,
  }
}();