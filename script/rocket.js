game.createRocket = (centerX, centerY, imgSrc, gravityDelta, context) => {

  let rocket = loadImage(imgSrc);
  rocket.width = 80;
  rocket.height = 40;
  rocket.center = {
    x: centerX,
    y: centerY,
  };
  rocket.angle = 1 * Math.PI;
  rocket.rotate = {
    direction: 0,
    speed: .0005 * Math.PI,
  };
  rocket.velocity = {
    x: 0,
    y: 0,
  };
  rocket.fuel = {
    percent: 100,
    dec: .01,
  }
  rocket.thrust = false;
  rocket.noThrust = false;
  rocket.stopped = {
    bool: false,
    timer: 3000,
  };
  rocket.thrustVis = ParticleSystem(game.graphics, {
    image: './assets/fire.png',
    center: {x: centerX, y: centerY},
    size: {mean: 10, stdev: 3},
    speed: { mean: 0, stdev: 0.1},
    lifetime: { mean: 500, stdev: 100}
  });
  rocket.gravity = gravityDelta;
  rocket.context = context;
  rocket.blowUp = {
    bool: false,
    timer: 3000,
  }
  rocket.audio = {
    thrust: new Audio(game.audio.thrust),
    blowUp: new Audio(game.audio.blowUp),
  } 



  function rotate_(elapsedTime) {
    rocket.angle += elapsedTime * rocket.rotate.speed * rocket.rotate.direction;
  }


  function thrust_(elapsedTime) {
    if(rocket.thrust) {
      let acc = rocket.gravity * 3;
      rocket.audio.thrust.play();
      
      rocket.fuel.percent -= elapsedTime * rocket.fuel.dec;

      rocket.velocity.x -= elapsedTime * acc * Math.cos(rocket.angle);
      rocket.velocity.y -= elapsedTime * acc * Math.sin(rocket.angle);
    }
    else {
      rocket.audio.thrust.pause();
    }
  }


  function setThrust(thrust=false) {
    rocket.thrust = thrust && !rocket.noThrust;
  }


  function setNoThrust(noThrust=true) {
    rocket.noThrust = noThrust;
  }


  function setRotate(direction=0) {
    rocket.rotate.direction = direction;
  }


  function update(elapsedTime) {
    if(!rocket.blowUp.bool && !rocket.stopped.bool) {
      rocket.velocity.y += elapsedTime * rocket.gravity; 

      rotate_(elapsedTime);
      thrust_(elapsedTime);

      rocket.thrustVis.update(elapsedTime, rocket.center, rocket.angle, rocket.thrust);

      rocket.center.x += rocket.velocity.x; 
      rocket.center.y += rocket.velocity.y; 
      return true;
    }
    else if(rocket.stopped.bool) {
      rocket.audio.thrust.pause();
      rocket.stopped.timer -= elapsedTime;
      rocket.thrustVis.update(elapsedTime, rocket.center, rocket.angle, rocket.thrust);

      if(rocket.stopped.timer < 0) return false;
      else return true;
    }
    else {
      rocket.audio.thrust.pause();
      rocket.blowUp.timer -= elapsedTime;
      rocket.blowUp.vis.update(elapsedTime);
      
      if(rocket.blowUp.timer < 0) return false;
      else return true;

    }
  }


  function render() {
    if(!rocket.blowUp.bool) {
      rocket.thrustVis.render();
      renderImage(rocket, context);
    }
    else {
      rocket.blowUp.vis.render();
    }
  }


  function startBlowUp() {
    rocket.audio.blowUp.play();
    rocket.blowUp.bool = true;
    rocket.blowUp.vis = ParticleSystemCircular(game.graphics, {
      image: './assets/fire.png',
      center: rocket.center,
      size: {mean: 15, stdev: 5},
      speed: { mean: 0, stdev: 0.2},
      lifetime: { mean: 500, stdev: 100}
    });
  }


  function stop() {
    rocket.stopped.bool = true;
    setNoThrust();
  }

  
  return {
    // ------------------------------- Functions -------------------------------
    update: update,
    render: render,
    startBlowUp: startBlowUp,
    stop: stop,

    // -------------------------------  Getters -------------------------------- 
    getCenter: () => rocket.center,
    getCollisionRadius: () => Math.max(rocket.width / 2, rocket.height / 2),
    getStats: () => {return {
        vertSpeed: - rocket.velocity.y * 3, 
        angle: (360 + (rocket.angle * 57.2958 - 90) % 360) % 360,
        fuel: rocket.fuel.percent,
        blowUp: rocket.blowUp.bool,
    }},
    isBlowUp: () => rocket.blowUp.bool,
    isStopped: () => rocket.stopped.bool,

    // -------------------------------- Setters -------------------------------- 
    setThrust: setThrust,
    setNoThrust: setNoThrust,
    setRotate: setRotate,
  };
};