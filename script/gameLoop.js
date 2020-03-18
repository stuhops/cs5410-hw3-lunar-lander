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
    let landable = updateDomStats();

    let terrain = game.terrain.terrainMap;
    let center = game.rocket.getCenter();
    if(!game.rocket.isBlowUp() && !game.rocket.isStopped()) {
      for(let i = 0; i < terrain.length - 1; i++) {
        if(game.collision.lineCircleIntersection(
          terrain[i], 
          terrain[i+1], 
          {
            center: center,
            radius: game.rocket.getCollisionRadius(),
          }
        )) {
          if(terrain[i].landingZone && landable) {
            let winAudio = new Audio(game.audio.win);
            game.won = true;
            winAudio.play();
            manageHighScores(Number(document.getElementById('my-score').innerHTML));
            game.rocket.stop();
            break;
          }
          else if (requestFrame) {
            game.won = false;
            game.rocket.startBlowUp();
            break;
          }
        }
      }
    }

    if(game.rocket.getCenter().y > 1024) {
      game.rocket.startBlowUp();
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

    lastTime = time;
    if(!game.gameOver && requestFrame) {
      requestAnimationFrame(gameLoop);
    }
    else {
      renderNextLevelCountdown();
      gameOver(elapsedTime);
    }
  }

  function startGameLoop() {
    game.gameOverTimer = 3000;
    lastTime = performance.now();
    requestFrame = true;
    requestAnimationFrame(gameLoop);
  }

  function stopGameLoop() {
    requestFrame = false;
  }

  function gameOver(elapsedTime) {
    game.gameOverTimer -= elapsedTime;
    if(game.level != game.levels && game.gameOverTimer > 0) {
      requestAnimationFrame(gameLoop);
    }
    else {
      document.getElementById('my-prev-score').innerHTML = document.getElementById('my-score').innerHTML;
      document.getElementById('my-score').innerHTML = '100';
    }

    if(game.won) {
      if(game.gameOverTimer < 0 && game.level != game.levels) {
        if(!game.won) {
          navigate('game-over');
        }
        game.level++;
        navigate('game-play')
      }
      else if(game.level == game.levels) {
        navigate('game-over');
      }
    }
    else {
      navigate('game-over');
    }
  }

  function renderNextLevelCountdown() {
    context.font = 'italic 64px sans-serif';
    context.fillText('Next Level in: ' + ((game.gameOverTimer) * .001).toFixed(), 10, 50);
  }

  return {
    start: startGameLoop,
    stop: stopGameLoop,
  }
}();