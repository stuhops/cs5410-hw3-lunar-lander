game.createTerrain = (game) => {
  let terrain = {
    detail: 200,
    stdDev: 50,
    min: game.gameHeight / 2,
    max: game.gameHeight,
  }
  terrain.map = [];
  terrain.start = Random.nextGaussian(2 * game.gameHeight / 3, terrain.stdDev);


  if(game.level === 1) {
    terrain.spacing = game.gameWidth / terrain.detail;
    terrain.map.push({x: 0, y: terrain.start})

    let landing1 = {
      x: Math.floor(Math.random() * (terrain.detail - terrain.detail/5) / 2 + 1),
      y: Random.nextGaussian(2 * game.gameHeight / 3, terrain.stdDev / 2),
      landingZone: true,
    }
    let landing2 = {
      x: Math.floor(Math.random() * terrain.detail / 2 + (terrain.detail) / 2),
      y: Random.nextGaussian(2 * game.gameHeight / 3, terrain.stdDev / 2),
      landingZone: true,
    }

    let next; 
    for(let i = 1; i < terrain.detail; i++) {
      if(i == landing1.x) {
        for(let j = 0; j < Math.floor(terrain.detail/5); j++) {
          terrain.map.push({x: (i+j)*terrain.spacing, y: landing1.y, landingZone: true, landing: 1});
        }
        i += Math.floor(terrain.detail/5) - 1;
      }
      else if(i == landing2.x) {
        for(let j = 0; j < Math.floor(terrain.detail/5); j++) {
          terrain.map.push({x: (i+j)*terrain.spacing, y: landing2.y, landingZone: true, landing: 2});
        }
        i += Math.floor(terrain.detail/5) - 1;
      }
      else {
        while(true) {
          next = Random.nextGaussian(terrain.map[i-1].y, terrain.stdDev);
          if(next > terrain.min && next < terrain.max)
            break;
        }
        terrain.map.push({x: i*terrain.spacing, y: next, landingZone: false});
      }
    }
  }

  if(game.level === 2) {
    terrain.spacing = game.gameWidth / terrain.detail;
    terrain.map.push({x: 0, y: terrain.start})

    let landing = {
      x: Math.floor(Math.random() * (terrain.detail - terrain.detail/5)),
      y: Random.nextGaussian(2 * game.gameHeight / 3, terrain.stdDev / 2),
      landingZone: true,
    }

    let next; 
    for(let i = 1; i < terrain.detail; i++) {
      if(i == landing.x) {
        for(let j = 0; j < Math.floor(terrain.detail/6); j++) {
          terrain.map.push({x: (i+j)*terrain.spacing, y: landing.y, landingZone: true});
        }
        i += Math.floor(terrain.detail/6) - 1;
      }
      else {
        while(true) {
          next = Random.nextGaussian(terrain.map[i-1].y, terrain.stdDev);
          if(next > terrain.min && next < terrain.max)
            break;
        }
        terrain.map.push({x: i*terrain.spacing, y: next, landingZone: false});
      }
    }
  }


  function render(context) { 
    context.strokeStyle = 'white';
    context.fillStyle = 'black';
    context.lineWidth = 6;
    context.beginPath();
    context.moveTo(0, game.gameHeight);

    for(let i = 0; i < terrain.map.length; i++) {
      context.lineTo(terrain.map[i].x, terrain.map[i].y);
    }
    context.lineTo(game.gameWidth, game.gameHeight);
  

    context.closePath();
    context.stroke();
    context.fill();
  }

  return {
    render: render,
    terrainMap: terrain.map,
  }

};