game.gameLoop = function() {
  let lastTime = performance.now();

  function processInput() {
    game.rocket.setThrust(false);
    for(input in inputBuffer) {
      if(input == game.up) {
        game.rocket.setThrust(true);
      }
    }
  }


  function update(elapsedTime) {
    game.rocket.update(elapsedTime);

    if(game.rocket.getCenter().y > 1024) {
      game.gameOver = true;
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