game.gameLoop = function() {
  let lastTime = performance.now();

  function processInput() {
  }


  function update(elapsedTime) {
    game.rocket.update(elapsedTime);
  }


  function render() {
    game.rocket.render(context)
  }


  function gameLoop(time) {
    let elapsedTime = time - lastTime;

    processInput();
    update(elapsedTime);
    render(elapsedTime);

    requestAnimationFrame(gameLoop);
  }

  function startGameLoop() {
    lastTime = performance.now();
    requestAnimationFrame(gameLoop);
  }

  return {
    start: startGameLoop,
  }
}();