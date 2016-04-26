
function Person() {

}

Person.prototype.name = 'BYVoid';
Person.prototype.showName = function() {
	console.log(this.name);
};

var person = new Person();
person.showName();

function Foo() {
	var innerVar = 'hello';
	this.prop1 = 'BYVoid';
	this.func1 = function() {
		innerVar = '';
	};
}

Foo.prototype.prop2 = 'Carbo';
Foo.prototype.func2 = function() {
	console.log(this.prop2);
}

var foo1 = new Foo();
var foo2 = new Foo();
console.log(foo1.func1 === foo2.func1);
console.log(foo1.func2 === foo2.func2);