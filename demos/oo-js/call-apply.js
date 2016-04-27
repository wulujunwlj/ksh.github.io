
var obj = {
	name: 'Ninja',
	say: function(who) {
		return 'Haya ' + who + ', I am a ' + this.name;
	}
};

console.log(obj.say('Dude'));
var obj2 = {
	name: 'Scripting guru'
};
console.log(obj.say.apply(obj2, ['Dude']));