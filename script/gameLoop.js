game.gameLoop = function() {
  let lastTime = performance.now();
  let requestFrame = true;

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
    game.gameOver = !game.rocket.update(elapsedTime);

    let terrain = game.terrain.terrainMap;
    let center = game.rocket.getCenter();
    if(!game.rocket.isBlowUp()) {
      for(let i = 0; i < terrain.length - 1; i++) {
        if(game.collision.lineCircleIntersection(
          terrain[i], 
          terrain[i+1], 
          {
            center: center,
            radius: game.rocket.getCollisionRadius(),
          }
        )) {
          if(terrain[i].landingZone) {
            console.log('WINNER');
          }
          else {
            console.log('BLOW UP');
            game.rocket.startBlowUp();
          }

        }
      }
    }

    if(game.rocket.getCenter().y > 1024) {
      game.gameOver = true;
    }
  }


  function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    game.terrain.render(context);
    game.rocket.render(context)
  }


  function gameLoop(time) {
    let elapsedTime = time - lastTime;

    processInput();
    update(elapsedTime);
    render(elapsedTime);

    if(!game.gameOver && requestFrame) {
      lastTime = time;
      requestAnimationFrame(gameLoop);
    }
  }

  function startGameLoop() {
    // game.rocket.startBlowUp();
    lastTime = performance.now();
    requestFrame = true;
    requestAnimationFrame(gameLoop);
  }

  function stopGameLoop() {
    requestFrame = false;
  }

  return {
    start: startGameLoop,
    stop: stopGameLoop,
  }
}();