function Network(sizes) {
	this.sizes = sizes
	this.layers = []

	for (let i = 0; i < this.sizes.length - 1; i++) {
		let w = []
		for (let j = 0; j < this.sizes[i + 1]; j++) {
			w[j] = []

			for (let k = 0; k < this.sizes[i]; k++)
				w[j][k] =  Math.random() - 0.5
		}

		this.layers.push(w)
	}
}

Network.prototype.GetOutput = function(input) {
	for (let i = 0; i < this.layers.length; i++) {
		let output = []

		for (let j = 0; j < this.layers[i].length; j++) {
			let y = 0

			for (let k = 0; k < this.layers[i][j].length; k++)
				y += this.layers[i][j][k] * input[k]

			output[j] = y
		}

		input = output
	}

	return input
}

function CopyNetwork(network) {
	let net = new Network(network.sizes)

	for (let i = 0; i < network.layers.length; i++)
		for (let j = 0; j < network.layers[i].length; j++)
			for (let k = 0; k < network.layers[i][j].length; k++)
				net.layers[i][j][k] = network.layers[i][j][k]

	return net
}

function CrossOver(parent1, parent2) {
	let child = new Network(parent1.sizes)

	for (let i = 0; i < parent1.layers.length; i++)
		for (let j = 0; j < parent1.layers[i].length; j++)
			for (let k = 0; k < parent1.layers[i][j].length; k++)
				if (Math.random() > 0.5)
					child.layers[i][j][k] = parent1.layers[i][j][k]
				else
					child.layers[i][j][k] = parent2.layers[i][j][k]

	return child
}

function Mutate(network, p) {
	for (let i = 0; i < network.layers.length; i++)
		for (let j = 0; j < network.layers[i].length; j++)
			for (let k = 0; k < network.layers[i][j].length; k++)
				if (Math.random() < p)
					network.layers[i][j][k] = Math.random() - 0.5
}