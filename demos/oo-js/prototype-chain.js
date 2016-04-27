
function Shape() {}
Shape.prototype.name = 'shape';
Shape.prototype.toString = function() {
	return this.name;
};

function TwoDShape() {}
var F = function() {};
F.prototype = Shape.prototype;
// TwoDShape.prototype = new Shape();
TwoDShape.prototype = new F();
TwoDShape.prototype.constructor = TwoDShape;
TwoDShape.prototype.name = '2D shape';

function Triangle(side, height) {
	this.side = side;
	this.height = height;
}
var F = function() {};
F.prototype = TwoDShape.prototype;
// Triangle.prototype = new TwoDShape();
Triangle.prototype = new F();
Triangle.prototype.constructor = Triangle;

Triangle.prototype.name = 'Triangle';
Triangle.prototype.getArea = function() {
	return this.side * this.height / 2;
};

// var triangle = new Triangle(5, 10);
// console.log(triangle.getArea());
// console.log(triangle.toString());
// console.log(triangle.constructor);
// console.log(triangle instanceof(Triangle));
// console.log(triangle instanceof(TwoDShape));
// console.log(triangle instanceof(Shape));

// var twoDShape = new TwoDShape();
// console.log(twoDShape.toString());
// console.log(twoDShape.toString === triangle.toString);

var triangle = new Triangle(5, 10);
console.log(triangle.getArea());
console.log(triangle.toString());
