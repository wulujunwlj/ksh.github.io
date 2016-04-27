
var obj = new String('world');
console.log(typeof obj);
console.log(obj.toString());
console.log(obj[2]);
console.log(obj.length);

console.log(Boolean(''));
console.log(Boolean(new String('')));

var str = 'hello world';
var substr1 = str.substring(3, -2);
var substr2 = str.slice(3, -2);
console.log(substr1, '<-->', substr2);