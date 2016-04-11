/**
 * 原型继承的问题
 */
/*
function Vector2D(x, y) {
	this.x = x;
	this.y = y;
}

Vector2D.prototype.length = function() {
	return Math.sqrt(this.x * this.x + this.y * this.y);
}

function Vector3D (x,y, z) {
	 Vector2D.call(this, x, y);

	 this.z = z;
}

Vector3D.prototype = new Vector2D();		// 调用了父类的构造器

Vector3D.prototype.length = function() {
	return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
}

var p = new Vector3D(1, 2, 3);
console.log(p.x, p.y, p.z, p.length(), p instanceof(Vector3D), p instanceof(Vector2D));
*/

/**
 * 改良版本
 */
function createObjWithoutConstructor(Class) {
	function T() {};

	T.prototype = Class.prototype;

	return new T();
}

function Vector2D(x, y) {
	this.x = x;
	this.y = y;
}

Vector2D.prototype.length = function() {
	return Math.sqrt(this.x * this.x + this.y * this.y);
}

function Vector3D (x,y, z) {
	 Vector2D.call(this, x, y);

	 this.z = z;
}

Vector3D.prototype = createObjWithoutConstructor(Vector2D);

Vector3D.prototype.length = function() {
	return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
}

var p = new Vector3D(1, 2, 3);
console.log(p.x, p.y, p.z, p.length(), p instanceof(Vector3D), p instanceof(Vector2D));