var screenWidth = 640;
var screenHeight = 480;
var dotSize = 30;
var pistil = []; 
var petals = [];
var growRate = 0.1;
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

	if (count > 100) return;
	var printOut = '';
    var isModThree = count % 3 == 0;
    var isModFive = count % 5 == 0;
	
	
	if(isModThree){
		printOut = 'Fizz';
	}
	if(isModFive){
		printOut += 'Buzz'
	}
	if(!isModFive && !isModThree){
		printOut = count;
	}

	console.log(printOut);
	
	count = (count + 1) 


		
}

function newFlower(cX, cY, height){
	var cX = cX; var cY = cY; var height = height;
	var dots = [];
	var pistils = [];
	return {
		draw: function(){
			dots.forEach(function(d){
				d.draw();
			});
			pistils.forEach(function(p){
				p.draw();
				});

			}
		}
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
