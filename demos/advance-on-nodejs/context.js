// function pet(words) {
// 	this.words = words;

// 	console.log(this);
// }

// pet('123');

// var pet = {
// 	words: '123',
// 	speak: function() {
// 		console.log(this.words);

// 		console.log(this === pet);
// 	}
// }
// pet.speak();

// function Pet(words) {
// 	this.words = words;

// 	this.speak = function() {
// 		console.log(this.words);
// 		console.log(this === global);
// 	}
// }

// var cat = new Pet('Miao');
// cat.speak();


/**
 * call apply extend
 * 利用 call apply 实现继承
 */
function Pet(words) {
	this.words = words;

	this.speak = function() {
		console.log(this.words);
	}
}

function Dog(words) {
	Pet.call(this, words);

	// Pet.apply(this, arguments);
}

var dog = new Dog('Wang');
dog.speak();