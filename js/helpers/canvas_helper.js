var CanvasHelper = function() {};

// Border-radius for rectangles
CanvasHelper.prototype.roundRect = function(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
},

// Image resizing in canvas only preserves quality if resized by factors of 2 or less.
// This takes 512x512 => 256x256, which is later transformed into 140x140
CanvasHelper.prototype.halvedImage = function(image) {
  var cc = document.createElement("canvas");
  var ctx = cc.getContext("2d");
  cc.width = image.width / 2;
  cc.height = image.height / 2;
  ctx.drawImage(image, 0, 0, cc.width, cc.height);
  return cc;
},

// Max-width for text blocks
CanvasHelper.prototype.truncateText = function (text, ctx, widthLimit) {
  while (ctx.measureText(text).width > widthLimit) {
    text = text.substring(0, text.length - 1);
  }

  return text;
}

// External web fonts need to be loaded before canvas rendering
CanvasHelper.prototype.loadFonts = function() {
  WebFontConfig = {
      google:{ families: ['Lato'] },
    };

  var wf = document.createElement("script");
  wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
  document.head.appendChild(wf);
}