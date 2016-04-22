
function myFunc(a, b, c) {
	return true;
}

console.log(myFunc.length);
console.log(myFunc.caller);

function A() {
	return A.caller;
}

function B() {
	return A();
}
var caller = B();
console.log(caller);