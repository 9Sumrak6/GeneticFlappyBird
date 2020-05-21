const WIDTH = 900
const HEIGHT = 500

const GRAVITY = 10
const DT = 0.2
const SPEED = 30

function Bird(x, y) {
	// координаты птицы
	this.x = x
	this.y = y

	this.vy = 0 // скорость птицы

	// размеры птицы
	this.width = 40
	this.height = 32
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
	ctx.fillStyle = "#000"
	ctx.fillRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height)
}

// проверка на достижение земли
Bird.prototype.IsOk = function() {
	return this.y + this.height / 2 < HEIGHT
}