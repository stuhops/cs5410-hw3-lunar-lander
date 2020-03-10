let loadImage = (imgSrc) => {
  let img = new Image();
  img.isReady = false;
  img.onload = function() {
      this.isReady = true;
  };
  img.src = imgSrc;
  return img;
}
