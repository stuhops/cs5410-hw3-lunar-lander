game.createTerrain = (game) => {
  let terrain = {
    detail: 20,
    stdDev: 200,
    min: game.gameHeight / 2,
    max: game.gameHeight,
  }
  terrain.map = [];
  terrain.start = Random.nextGaussian(2 * game.gameHeight / 3, terrain.stdDev);


  if(game.level === 1) {
    terrain.spacing = game.gameWidth / terrain.detail;
    terrain.map.push({x: 0, y: terrain.start})

    let landing1 = {
      x: Math.floor(Math.random() * (detail - 4) / 2),
      y: Random.nextGaussian(terrain.map[i-1].y, terrain.stdDev),
      landingZone: true,
    }
    let landing2 = {
      x: Math.floor(Math.random() * detail / 2 + detail / 2),
      y: Random.nextGaussian(terrain.map[i-1].y, terrain.stdDev),
      landingZone: true,
    }

    let next; 
    for(let i = 1; i < terrain.detail; i++) {
      while(true) {
        next = Random.nextGaussian(terrain.map[i-1].y, terrain.stdDev);
        if(next > terrain.min && next < terrain.max)
          break;
      }
      terrain.map.push({x: i*terrain.spacing, y: next, landingZone: false});
    }
    console.log(terrain.map);
   }

  if(game.level === 2) { }

  function render() { 
    context.strokeStyle = 'rgb(255, 255, 255)';
    context.lineWidth = 6;
    context.moveTo(0, game.gameHeight);

    for(let i = 0; i < terrain.map.length; i++) {
      context.lineTo(terrain.map[i].x, terrain.map[i].y);
    }
    context.lineTo(game.gameWidth, game.gameHeight);
  

    context.closePath();
    context.stroke();
  }

  render();

};