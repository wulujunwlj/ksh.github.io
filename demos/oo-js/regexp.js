
var str = 'JavaScript';

console.log(/j.*t/i.test(str));
console.log(/j.*t/i.exec(str));

var str2 = 'abcabcxyzaacchij';
console.log(str2.match(/a/g));
console.log(str2.search(/aa/));
console.log(str2.replace('abc', '123'));
console.log(str2);