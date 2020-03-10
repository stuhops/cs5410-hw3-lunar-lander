game.createRocket = (posX, posY, imgSrc, gravityDelta, context) => {

  let rocket = {
    pos: {
      x: posX,
      y: posY,
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
    // rocket.velocity.x += elapsedTime * rocket.gravity; 

    // rotate_(elapsedTime, rotate);
    // thrust_(elapsedTime, thrust);

    context.drawImage(rocket.img, 0, 0);
    

    return rocket;
  }

  
  return {
    // ------------------------------- Functions -------------------------------
    update: update,


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