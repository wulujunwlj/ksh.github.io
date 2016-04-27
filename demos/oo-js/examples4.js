
// 1
var a = 12;
function F() {
	var b = 'aaa';
	function C() {
		return this;
	}

	return C();
}
var o = new F();
console.log(o.a);
console.log('====================');

// 2
function C() {
	this.a = 1;

	return false;
}
console.log(typeof new C());
console.log(new C());
console.log('====================');

// 3
var c = [1, 2, [1, 2]];
console.log(c.sort());
console.log(c.join('--'));
console.log(c)