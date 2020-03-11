game.changeKey = function(value) {
  function keyPress(event) {
    game[value] = event.key;
    document.getElementById(`control-${value}`).innerHTML = event.key;
    window.removeEventListener('keydown', keyPress);
  }
  window.addEventListener('keydown', keyPress);
}