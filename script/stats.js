function updateDomStats() {
  let stats = game.rocket.getStats();

  setFuel(stats);
  setScore(stats);
  let speedBool = setVertSpeed(stats);
  let angleBool = setAngle(stats);
  let landable = speedBool && angleBool;

  return landable;
}

function setFuel(stats) {
  let fuel = document.getElementById("fuel");
  let fuel_stat = stats.fuel.toFixed();
  if(fuel_stat < 0) {
    fuel_stat = 'Empty!';
    document.getElementById("fuel-div").style.color = 'white';
    game.rocket.setNoThrust(true);
  }
  else {
    document.getElementById("fuel-div").style.color = 'green';
  }

  fuel.innerHTML = fuel_stat;
}


function setScore(stats) {
  let score = document.getElementById("my-score");
  let fuel_stat = stats.fuel.toFixed();
  if(stats.blowUp || fuel_stat < 0) {
    score.innerHTML = '0';
  }
  else {
    score.innerHTML = fuel_stat;
  }
}


function setVertSpeed(stats) {
  let vertSpeedEl = document.getElementById("vert-speed");
  let vertSpeed = stats.vertSpeed.toFixed(2);
  let landable = false;
  if(vertSpeed > -2) {
    // TODO: Make the ship stop thrusting
    document.getElementById("vert-speed-div").style.color = 'green';
    landable = true;
  }
  else {
    document.getElementById("vert-speed-div").style.color = 'white';
  }
  vertSpeedEl.innerHTML = vertSpeed + 'm/s';
  return landable;
}


function setAngle(stats) {
  let angle = document.getElementById("angle");
  let angleStat = stats.angle.toFixed(2);
  let landable = false;

  if(angleStat <= 5 || angleStat >= 355) {
    document.getElementById("angle-div").style.color = 'green';
    landable = true;
  }
  else {
    document.getElementById("angle-div").style.color = 'white';
  }

  angle.innerHTML = angleStat + '&deg;'
  return landable;
}