var screenWidth = 640;
var screenHeight = 480;
var dotSize = 30;
var pistil = []; 
var petals = [];
var growRate = 0.1;

function setup() {
  // put setup code here
	createCanvas(screenWidth, screenHeight);
	var cX = screenWidth/2; var cY = screenHeight/2;
	pistil.push(dot(cX, cY, dotSize, 0.05));
	var dotCount = 10;
	var radius = dotSize ;
	// place the outter dots equidistant around the circle
	for(var i = 0; i < dotCount; i++) {
	    var x = cX + radius * Math.cos(2 * Math.PI * i / dotCount);
	    var y = cY + radius * Math.sin(2 * Math.PI * i / dotCount);   
		pistil.push(dot(x, y, dotSize, growRate));
	}
	var petalCount = 8;
	var petalLength = dotSize * 2;
	var petalRadius = dotSize * 2;
	for(var i = 0; i < petalCount; i++) {
	    var x1 = cX + petalRadius * Math.cos(2 * Math.PI * i / petalCount);
	    var y1 = cY + petalRadius * Math.sin(2 * Math.PI * i / petalCount);   
		var x2 = cX + (petalLength+petalRadius) * Math.cos(2 * Math.PI * i / petalCount);
	    var y2 = cY + (petalLength+petalRadius) * Math.sin(2 * Math.PI * i / petalCount);
		petals.push(petal(x1, y1, x2, y2, cX, cY));
	}
}

function draw() {
	pistil.forEach(function(p){
		p.draw()
	});
	petals.forEach(function(p){
		p.draw();
	})
}

function dot(_centerX, _centerY, _maxSize, _growRate){
	var innerSize = 0;
	var centerX = _centerX;
	var centerY = _centerY;
	var maxCircleSize = _maxSize;
	var growRate = _growRate;
	return {
		draw: function(){
		    fill(255, 204, 0);
			noStroke();
			ellipse(centerX, centerY, maxCircleSize, maxCircleSize)
			fill(0,0,0)
			innerSize = (innerSize + growRate) % maxCircleSize; 
			ellipse(centerX, centerY, innerSize, innerSize) // growing just the x or y is pretty neat
			}
		}
}

function petal(x1, y1, x2, y2, cX, cY){
	var x1 = x1; var y1 = y1; var y2 = y2;
	var cX = cX; var cY = cY;
	var rotationalAngle = 0; 
	return {
			draw: function(){
				rotationalAngle  = rotationalAngle % 360;
				stroke(128,0,128);
				strokeWeight(10);
				//translate(cX, cY)
				//rotate(rotationalAngle++)
				line(x1, y1, x2, y2);
			}
	}

}
