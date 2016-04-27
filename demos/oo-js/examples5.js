
// 1.
var shape = {
	type: 'type',
	getType: function() {
		return this.type;
	}
}
console.log(shape.getType());

// 2.
function Triangle(a, b, c) {

}
Triangle.prototype = shape;

var triangle = new Triangle(2, 4, 5);
console.log(triangle.type);
console.log(triangle.getType());

shape.getPerimeter = function() {
	console.log('in getPerimeter');
}

console.log(triangle.getPerimeter());