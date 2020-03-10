game.gameLoop = function() {
  let lastTime = performance.now();

  function processInput() {
  }


  function update(elapsedTime) {
    game.rocket.update(elapsedTime, context);
  }


  function render() {
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