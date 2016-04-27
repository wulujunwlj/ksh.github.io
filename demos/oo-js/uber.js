
function Shape() {}

Shape.prototype.name = 'shape';
Shape.prototype.toString = function() {
	var result = {};

	if (this.constructor.uber) {
		result[result.length] = this.constructor.uber.toString();
	}
	result[result.length] = this.name;

	return result.join(', ');
}

function TwoDShape() {
	
}