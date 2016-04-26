
var generateClosure = function() {
	var count = 0;

	var get = function() {
		count++;

		return count;
	}

	return get;
};

var counter = generateClosure();
console.log(counter());
console.log(counter());
console.log(counter());