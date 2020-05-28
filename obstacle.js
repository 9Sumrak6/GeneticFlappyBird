const GAP = 150
const OBSTACLE_WIDTH = 70

function Obstacle(x, speed) {
	this.x = x
	this.y = Math.floor(GAP / 3 + Math.random() * (HEIGHT - 1.5 * GAP))

	this.vx = speed 

	let imgs = [ 'pipeUp', 'pipeDown']
	this.img = document.getElementById(imgs[0])
	this.img1 = document.getElementById(imgs[1])
}

Obstacle.prototype.Draw = function(ctx) {
	ctx.drawImage(this.img1, this.x - OBSTACLE_WIDTH / 2, this.y - this.img1.height / 2.5, OBSTACLE_WIDTH, this.img1.height / 2.5);
	ctx.drawImage(this.img, this.x - OBSTACLE_WIDTH / 2, this.y + GAP, OBSTACLE_WIDTH, this.img.height / 2.5);
	/*ctx.fillRect(this.x - OBSTACLE_WIDTH / 2, 0, OBSTACLE_WIDTH, this.y)
	ctx.fillRect(this.x - OBSTACLE_WIDTH / 2, this.y + GAP, OBSTACLE_WIDTH, HEIGHT - this.y - GAP)*/
}

Obstacle.prototype.IsCollision = function(bird) {
	let x = bird.x - bird.width / 2

	if (x > this.x + OBSTACLE_WIDTH / 2) // если птица правее препятствия
		return false

	x += bird.width

	if (x < this.x - OBSTACLE_WIDTH / 2) // если птица левее препятствия
		return false

	let y1 = bird.y - bird.height / 2
	let y2 = bird.y + bird.height / 2

	return (y1 <= this.y) || (y2 >= this.y + GAP) // если столкнулась
}

Obstacle.prototype.Update = function() {
	this.x -= this.vx
}