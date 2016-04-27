
function Gadget(name, color) {
	this.name = name;
	this.color = color;

	this.someMethod = function() {
		return 1;
	}
}
Gadget.prototype.price = 10;
Gadget.prototype.rating = 3;

var newToy = new Gadget('webcam', 'black');

// for (var prop in newToy) {
// 	console.log(prop);
// 	console.log(newToy.propertyIsEnumerable(prop));
// 	console.log(newToy.hasOwnProperty(prop));
// 	console.log(newToy[prop]);
// 	console.log('=====================');
// }

var monkey = {
	hair: true,
	feeds: 'bananas',
	breathes: 'air'
};
function Human(name) {
	this.name = name;
}

Human.prototype = monkey;

var george = new Human('George');
console.log(Human.isPrototypeOf(george));
console.log(monkey.isPrototypeOf(george));
console.log(monkey.isPrototypeOf(Human));

var developer = new Human();
developer.feeds = 'Pizza';
developer.hacks = 'JavaScript';

console.log('===========');
console.log(developer.hacks);
console.log(developer.feeds);
delete developer.feeds;
console.log(developer.feeds);

console.log('==========');
console.log(developer.constructor);

developer.constructor = 'junk';
console.log('==========');
console.log(developer.constructor);
console.log(developer.feeds);
console.log(developer.breathes);


// 原型的陷阱
console.log('==========');
console.log('原型的陷阱');
function Dog() {
	this.tail = true;
}
var benji = new Dog();
var rusty = new Dog();

Dog.prototype.say = function() {
	return 'Woof!';
}

console.log(benji.say());
console.log(rusty.say());
console.log(benji.constructor);
console.log(rusty.constructor);

Dog.prototype = {
	paws: 4,
	hair: true
};

console.log(typeof benji.paws);
console.log(typeof rusty.paws);
console.log(benji.say());

var lucky = new Dog();
console.log(lucky.paws);