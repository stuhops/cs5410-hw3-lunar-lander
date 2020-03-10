game.createRocket = (posX, posY, imgSrc, gravityDelta, context) => {
  const WIDTH = 40;
  const HEIGHT = 80;

  let rocket = {
    pos: {
      x: posX,
      y: posY,
    },
    center: {
      x: rocket.pos.x + WIDTH  / 2,
      y: rocket.pos.y + HEIGHT / 2,
    },
    angle: 0,
    velocity: {
      x: 0,
      y: 0,
    },
    gravity: gravityDelta,
    img: loadImage(imgSrc),
    context: context,
  };


  rocket.img.width = 40;
  rocket.img.height = 80;

  function rotate_(elapsedTime, direction) {
    return rocket.angle;
  }


  function thrust_(elapsedTime, thrust) {
    if(thrust) {
      let acc = gravity * 1.5;
      
      rocket.velocity.x += elapsedTime * acc * Math.sin(rocket.angle);
      rocket.velocity.y += elapsedTime * acc * Math.cos(rocket.angle);
    }

    return rocket.velocity;
  }


  function update(elapsedTime, context, rotate=null, thrust=false) {
    rocket.velocity.y += elapsedTime * rocket.gravity; 
    rocket.pos.y += rocket.velocity.y; 

    // rotate_(elapsedTime, rotate);
    // thrust_(elapsedTime, thrust);
  }


  function render(context) {
    context.drawImage(rocket.img, rocket.pos.x, rocket.pos.y, rocket.img.width, rocket.img.height);
  }

  
  return {
    // ------------------------------- Functions -------------------------------
    update: update,
    render: render,


    // -------------------------------  Getters -------------------------------- 
    getPos: () => rocket.pos,
    getAngle: () => rocket.angle,
    getVelocity: () => rocket.velocity,
    getImg: () => rocket.img,

    // -------------------------------- Setters -------------------------------- 
    // setPos: (posX, posY) => { rocket.pos.x = posX; rocket.pos.y = posY; },
    // setAngle: () => rocket.angle,
    // setVelocity: (velX, velY) => { rocket.velocity.x = velX; rocket.velocity.y = velY; },
  };
};