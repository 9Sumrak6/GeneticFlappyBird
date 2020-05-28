const WIDTH = 1920
const HEIGHT = 900

const GRAVITY = 12
const DT = 0.2
const SPEED = 43

function Bird(x, y) {
	// координаты птицы
	this.x = x
	this.y = y

	this.vy = 0 // скорость птицы

	let imgs = [ 'bird1', 'bird2', 'bird3', 'bird4', 'bird5' ]
	this.img = document.getElementById(imgs[Math.floor(Math.random() * imgs.length)])

	// размеры птицы
	this.width = this.img.width;
	this.height = this.img.height;
}

// вспархивание птицы
Bird.prototype.Flap = function() {
	this.vy = SPEED
}

// обновление птицы
Bird.prototype.Update = function() {
	this.vy -= GRAVITY * DT // обновление скорости
	this.y -= this.vy * DT // обновление координаты	

	if (!this.IsOk())
		this.y = HEIGHT - this.height / 2
}

// отрисовка птицы
Bird.prototype.Draw = function(ctx) {
	ctx.drawImage(this.img, this.x - this.width / 2, this.y - this.height / 2);
}

// проверка на достижение земли
Bird.prototype.IsOk = function() {
	return this.y + this.height / 2 < HEIGHT
}

// проверка на столкновение с одним из препятствиz
Bird.prototype.IsCollision = function(obstacles) {
	for (let i = 0; i < obstacles.length; i++)
		if (obstacles[i].IsCollision(this))
			return true

	return false
}

Bird.prototype.GetInput = function(obstacles) {
	for (let i = 0; i < obstacles.length; i++)
		if (obstacles[i].x + OBSTACLE_WIDTH / 2  - this.x + this.width / 2 > 0) {
			let dx = obstacles[i].x + OBSTACLE_WIDTH / 2  - this.x + this.width / 2
			let dy1 = obstacles[i].y - this.y + this.height / 2
			let dy2 = obstacles[i].y + GAP - this.y - this.height / 2
			return [dx, dy1, dy2]
		}

	return [0, 0, 0]
}