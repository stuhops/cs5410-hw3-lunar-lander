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


game.createTerrainRMD = (game) => {
  let terrain = {
    detail: 6,
    stdDevPercent: .25,
    min: game.gameHeight / 2,
    max: game.gameHeight,
  }
  terrain.map = [];
  terrain.start = Random.nextGaussian(2 * game.gameHeight / 3, game.gameWidth * terrain.stdDevPercent);
  terrain.end = Random.nextGaussian(2 * game.gameHeight / 3, game.gameWidth * terrain.stdDevPercent);

  function randMidpointDis(line, depth) {
    if(depth === 0) {
      return [line];
    }

    let x1 = line.start.x + (line.end.x - line.start.x) / 2;
    let y1 = Random.nextGaussian(line.start.y + (line.end.y - line.start.y) / 2, (line.end.x - line.start.x) * terrain.stdDevPercent);

    let arr = [
      { 
        start: line.start,
        end: {
          x: x1,
          y: y1,
          landingZone: false,
        },
      },
      {
        start: {
          x: x1, 
          y: y1,
          landingZone: false,
        },
        end: line.end,
      },
    ];
    
    let left = randMidpointDis(arr[0], depth - 1);
    let right = randMidpointDis(arr[1], depth - 1);

    return left.concat(right);
  }

  // Create landing zones and seed original array
  let map;
  if(game.level === 1) {
    let x1 = Random.nextGaussian(game.gameWidth * .3, game.gameWidth * .075);
    let y1 = Random.nextGaussian(2 * game.gameHeight / 3, game.gameWidth * terrain.stdDevPercent);
    let x2 = Random.nextGaussian(game.gameWidth * .7, game.gameWidth * .075);
    let y2 = Random.nextGaussian(2 * game.gameHeight / 3, game.gameWidth * terrain.stdDevPercent);

    map = [
      { 
        start: {
          x: 0, 
          y: terrain.start,
          landingZone: false,
        },
        end: {
          x: x1,
          y: y1,
          landingZone: false,
        },
      },
      {
        start: {
          x: x1, 
          y: y1,
          landingZone: true,
        },
        end: {
          x: x1 + 175,
          y: y1,
          landingZone: true,
        },
      },
      {
        start: {
          x: x1 + 175, 
          y: y1,
          landingZone: false,
        },
        end: {
          x: x2,
          y: y2,
          landingZone: false,
        },
      },
      {
        start: {
          x: x2, 
          y: y2,
          landingZone: true,
        },
        end: {
          x: x2 + 175,
          y: y2,
          landingZone: true,
        },
      },
      {
        start: {
          x: x2 + 175, 
          y: y2,
          landingZone: false,
        },
        end: {
          x: game.gameWidth,
          y: terrain.end,
          landingZone: false,
        },
      }
    ];
  }

  if(game.level === 2) {
    let x1 = Random.nextGaussian(game.gameWidth * .5, game.gameWidth * .15);
    let y1 = Random.nextGaussian(2 * game.gameHeight / 3, game.gameWidth * terrain.stdDevPercent);

    map = [
      { 
        start: {
          x: 0, 
          y: terrain.start,
          landingZone: false,
        },
        end: {
          x: x1,
          y: y1,
          landingZone: false,
        },
      },
      {
        start: {
          x: x1, 
          y: y1,
          landingZone: true,
        },
        end: {
          x: x1 + 125,
          y: y1,
          landingZone: true,
        },
      },
      {
        start: {
          x: x1 + 125, 
          y: y1,
          landingZone: false,
        },
        end: {
          x: game.gameWidth,
          y: terrain.end,
          landingZone: false,
        },
      }
    ]
  }

  let tmpMap = [];
  for(let i = 0; i < map.length; i++) {
    if(!map[i].start.landingZone) {
      tmpMap = tmpMap.concat(randMidpointDis(map[i], terrain.detail));
    }
    else{
      tmpMap.push(map[i]);
    }
  }

  for(let i = 0; i < tmpMap.length; i++) {
    terrain.map.push(tmpMap[i].start);
  }

  terrain.map.push(map[map.length - 1].end);
  console.log(terrain.map);


    // Call all segments recursively until detail is reached
    // return new arrays and combine them together
    // return a combined array of all segments (get rid of extra info so the render function will still work)


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
}

