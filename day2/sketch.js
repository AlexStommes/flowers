var screenWidth = 1920;
var screenHeight = 1280;
var dotSize = 30;
var growRate = dotSize;
var flowers = [];
var count = 0;

function setup() {
  // put setup code here
  createCanvas(screenWidth, screenHeight);
  angleMode(DEGREES);
}


function draw() {
  // Randomly generate a field of flowers 
  // smaller edging back to the horizon?
  // They can sprout and grow
  // When you click one it shoots a seed out and sprouts and grows
  clear();
  flowers.forEach(function (f) {
    f.draw();
  });
}

function newFlower(_cX, _cY, _height){
  var cX = _cX; var cY = _cY; var height = _height;
  var pistils = []; var petals = [];
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
    var angle = i * (360 / petalCount);
    petals.push(petal(angle, cX, cY, color, petalRadius, petalLength));
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
  if (flowers.length > 20) {
    flowers.shift();
  }
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

function petal(angle, cX, cY, color, petalRadius, petalLength){
  var petalRadius = petalRadius;
  var outerRadius = petalRadius + petalLength;
  var petalLength = petalLength; var cX = cX; var cY = cY;
  var rate = 0.01;
  var angle = angle;
  return {
        draw: function(){
        angle += rate;
        //angle = angle % 360; test later
        var x1 = cX + sin(angle) * petalRadius; 
        var y1 = cY + cos(angle) * petalRadius; 
        var x2 = cX + sin(angle) * outerRadius;
        var y2 = cY + cos(angle) * outerRadius;
        stroke(color.r, color.g, color.b);
        strokeWeight(10);
        line(x1, y1, x2, y2);
      }
  }

}
