let loadImage = (imgSrc) => {
  let img = new Image();
  img.isReady = false;
  img.onload = function() {
      this.isReady = true;
  };
  img.src = imgSrc;
  return img;
}


let renderTexture = (img, context) => {
    if (img.ready) {
        context.save();
        context.translate(img.center.x, img.center.y);
        context.rotate(img.rotation);
        context.translate(-img.center.x, -img.center.y);
        context.drawImage(
            img.image,
            img.center.x - img.width/2,
            img.center.y - img.height/2,
            img.width, img.height);
        context.restore();
    }
}; 
