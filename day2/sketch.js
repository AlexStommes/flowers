var screenWidth = 640;
var screenHeight = 480;
var dotSize = 30;
var pistil = []; 
var petals = [];
var growRate = dotSize;
var flowers = [];
var count = 0;

function setup() {
  // put setup code here
  createCanvas(screenWidth, screenHeight);
}


function draw() {
  // Randomly generate a field of flowers 
  // smaller edging back to the horizon?
  // They can sprout and grow
  // When you click one it shoots a seed out and sprouts and grows

  flowers.forEach(function (f) {
    f.draw();
  });
}

function newFlower(_cX, _cY, _height){
  var cX = _cX; var cY = _cY; var height = _height;
  var pistils = [];
  var dotCount = Math.round(random(3, 12));
  var petalCount = Math.round(random(3, 12));
  var radius = dotSize;
  pistils.push(dot(cX, cY, dotSize, growRate));
  // place the outter dots equidistant around the circle
  for (var i = 0; i < dotCount; i++) {
    var x = cX + radius * Math.cos(2 * Math.PI * i / dotCount);
    var y = cY + radius * Math.sin(2 * Math.PI * i / dotCount);
    pistils.push(dot(x, y, dotSize, growRate));
  }
  var color = {
    r: Math.round(random(255)),
    g: Math.round(random(255)),
    b: Math.round(random(255))
  };
  var petalLength = dotSize * 2;
  var petalRadius = dotSize * 2;
  for (var i = 0; i < petalCount; i++) {
    var x1 = cX + petalRadius * Math.cos(2 * Math.PI * i / petalCount);
    var y1 = cY + petalRadius * Math.sin(2 * Math.PI * i / petalCount);
    var x2 = cX + (petalLength + petalRadius) * Math.cos(2 * Math.PI * i / petalCount);
    var y2 = cY + (petalLength + petalRadius) * Math.sin(2 * Math.PI * i / petalCount);
    petals.push(petal(x1, y1, x2, y2, cX, cY, color));
  }
  return {
    draw: function(){
      pistils.forEach(function(d){
        d.draw();
      });
      petals.forEach(function(p){
        p.draw();
        });
      }
    }
}

function mouseClicked() {
  flowers.push(new newFlower(mouseX, mouseY, 15));
}


function dot(_centerX, _centerY, _maxSize, _growRate){
  var innerSize = 0;
  var centerX = _centerX;
  var centerY = _centerY;
  var maxCircleSize = _maxSize;
  var timeStep = 0;
  var rate = 0.02;

  //Inner dot to oc

  // add random amount 
  return {
    draw: function(){
        fill(255, 204, 0);
      noStroke();
      ellipse(centerX, centerY, maxCircleSize, maxCircleSize);
      fill(0, 0, 0)
      timeStep += rate;
      innerSize = sin(timeStep) * maxCircleSize;
      
      //innerSize = (innerSize + growRate) % maxCircleSize; 
      ellipse(centerX, centerY, innerSize, innerSize) // growing just the x or y is pretty neat
      }
    }
}

function petal(x1, y1, x2, y2, cX, cY, color){
  var x1 = x1; var y1 = y1; var y2 = y2;
  var cX = cX; var cY = cY;
  var rotationalAngle = 0; 
  return {
      draw: function(){
        rotationalAngle  = rotationalAngle % 360;
        stroke(color.r, color.g, color.b);
        strokeWeight(10);
        //translate(cX, cY)
        //rotate(rotationalAngle++)
        line(x1, y1, x2, y2);
      }
  }

}
