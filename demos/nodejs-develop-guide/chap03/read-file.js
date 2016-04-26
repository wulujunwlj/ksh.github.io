
var fs = require('fs');
fs.readFile('file.txt', 'utf-8', function(err, data) {
	if (err) {
		console.error(err);
	} else {
		console.log(data);
	}
});
console.log('ended');

var data = fs.readFileSync('file2.txt', 'utf-8');
console.log(data);
console.log('ended 2');