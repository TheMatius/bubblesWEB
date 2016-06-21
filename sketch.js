var bubbles = [];
var colors = [];

function setup() {
	createCanvas(windowWidth, windowHeight);

	for (var i = 0; i < 20; i++) {
		colors[i] = color(random(255), random(255), random(255));
	}
}

function draw() {
	// background(0);
	fill(0, 3);
	rect(0, 0, width, height);

	for (var i = 0; i < bubbles.length; i++) {
		bubbles[i].move();
		bubbles[i].display();
		bubbles[i].distance(bubbles[i]);
		bubbles[i].size();
	}

	for (var i = 0; i < bubbles.length; i++) {
		for (var j = 0; j < bubbles.length; j++) {
			if (i != j && bubbles[i].distance(bubbles[j]))
			{
				bubbles[i].speedX *= -1;
				bubbles[i].speedY *= -1;
				bubbles[i].color = random(colors.length);
			}
		}
	}
}

function mouseDragged() {
	bubbles.push(new Bubble(mouseX, mouseY));
}

function Bubble(posX, posY) {
	this.posX = posX;
	this.posY = posY;
	this.radius = random(10, 20);
	this.speedX = random(-2, 2);
	this.speedY = random(-2, 2);
	this.color = random(colors.length);
	this.grow = false;
	
	this.display = function() {
		fill(colors[parseInt(this.color)]);
		ellipse(this.posX, this.posY, this.radius*2, this.radius*2);
		// ellipse(width-mouseX, mouseY, this.radius*2,  this.radius*2);
  // 		ellipse(mouseX, height-mouseY, this.radius*2, this.radius*2);
  // 		ellipse(width-mouseX, height-mouseY, this.radius*2, this.radius*2);
	}

	this.move = function() {
		this.posX += this.speedX;
		this.posY += this.speedY;

		if ((this.posX > width) || (this.posX < 0)) {
			this.speedX *= -1;
		}

		if ((this.posY > height) || (this.posY < 0)) {
			this.speedY *= -1;
		}
	}

	this.distance = function(bubble) {
		var dis = dist(this.posX, this.posY, bubble.posX, bubble.posY);

		if (dis < this.radius + bubble.radius) {
			return true;
		} else {
			return false;
		}
	}

	this.size = function() {
		if (this.radius > 30)
		this.grow = true;

		if (this.radius < 0)
			this.grow = false;

		if (!this.grow) this.radius++;
		else this.radius--;
	}
}


// function cube(x) {
// 	return x*x*x;
// }

// function conversor(dollars) {
// 	return dollars * 3000;
// }

// function CeliusToFahrenheit(celius) {
// 	return (celius * 9/5)+32;
// }