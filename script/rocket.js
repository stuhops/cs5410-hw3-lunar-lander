game.createRocket = (centerX, centerY, imgSrc, gravityDelta, context) => {

  let rocket = loadImage(imgSrc);
  rocket.width = 40;
  rocket.height = 80;
  rocket.center = {
    x: centerX,
    y: centerY,
  };
  rocket.angle = 1/2 * Math.PI;
  rocket.rotate = 0;
  rocket.velocity = {
    x: 0,
    y: 0,
  };
  rocket.thrust = false;
  rocket.gravity = gravityDelta;
  rocket.context = context;


  function rotate_(elapsedTime, direction) {
    return rocket.angle;
  }


  function thrust_(elapsedTime) {
    if(rocket.thrust) {
      let acc = rocket.gravity * 3;
      
      rocket.velocity.x -= elapsedTime * acc * Math.cos(rocket.angle);
      rocket.velocity.y -= elapsedTime * acc * Math.sin(rocket.angle);
    }

    return rocket.velocity;
  }


  function setThrust(thrust=false) {
    rocket.thrust = thrust;
  }


  function setRotate(direction=0) {
    rocket.rotate = direction;
  }


  function update(elapsedTime) {
    rocket.velocity.y += elapsedTime * rocket.gravity; 

    // rotate_(elapsedTime, rotate);
    thrust_(elapsedTime);

    rocket.center.y += rocket.velocity.y; 
  }


  function render() {
    // context.drawImage(rocket, rocket.center.x, rocket.center.y, rocket.width, rocket.height);
    renderImage(rocket, context);
  }

  
  return {
    // ------------------------------- Functions -------------------------------
    update: update,
    render: render,

    // -------------------------------  Getters -------------------------------- 
    // getCenter: () => rocket.center,
    // getAngle: () => rocket.angle,
    // getVelocity: () => rocket.velocity,

    // -------------------------------- Setters -------------------------------- 
    setThrust: setThrust,
    setRotate: setRotate,
    // setPos: (posX, posY) => { rocket.pos.x = posX; rocket.pos.y = posY; },
    // setAngle: () => rocket.angle,
    // setVelocity: (velX, velY) => { rocket.velocity.x = velX; rocket.velocity.y = velY; },
  };
};