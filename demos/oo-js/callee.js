

function func() {
	return arguments.callee;
}

console.log(func());

(function(count) {
	if (count < 5) {
		console.log(count);
		arguments.callee(++count);
	}
})(1);