game.createRocket = (centerX, centerY, imgSrc, gravityDelta, context) => {

  let rocket = loadImage(imgSrc);
  rocket.width = 80;
  rocket.height = 40;
  rocket.center = {
    x: centerX,
    y: centerY,
  };
  rocket.angle = 1/2 * Math.PI;
  rocket.rotate = {
    direction: 0,
    speed: .001 * Math.PI,
  };
  rocket.velocity = {
    x: 0,
    y: 0,
  };
  rocket.thrust = false;
  rocket.gravity = gravityDelta;
  rocket.context = context;


  function rotate_(elapsedTime) {
    rocket.angle += elapsedTime * rocket.rotate.speed * rocket.rotate.direction;
    console.log(rocket.angle);
  }


  function thrust_(elapsedTime) {
    if(rocket.thrust) {
      let acc = rocket.gravity * 3;
      
      rocket.velocity.x -= elapsedTime * acc * Math.cos(rocket.angle);
      rocket.velocity.y -= elapsedTime * acc * Math.sin(rocket.angle);
    }
  }


  function setThrust(thrust=false) {
    rocket.thrust = thrust;
  }


  function setRotate(direction=0) {
    rocket.rotate.direction = direction;
  }


  function update(elapsedTime) {
    rocket.velocity.y += elapsedTime * rocket.gravity; 

    rotate_(elapsedTime);
    thrust_(elapsedTime);

    rocket.center.x += rocket.velocity.x; 
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
    getCenter: () => rocket.center,
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