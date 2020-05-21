const GAP = 150
const OBSTACLE_WIDTH = 50

function Obstacle(x, speed) {
	this.x = x
	this.y = Math.floor(GAP / 3 + Math.random() * (HEIGHT - 1.5 * GAP))
	this.vx = speed
}

Obstacle.prototype.Draw = function(ctx) {
	ctx.fillStyle = "#0f0"
	ctx.fillRect(this.x - OBSTACLE_WIDTH / 2, 0, OBSTACLE_WIDTH, this.y)
	ctx.fillRect(this.x - OBSTACLE_WIDTH / 2, this.y + GAP, OBSTACLE_WIDTH, HEIGHT - this.y - GAP)
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