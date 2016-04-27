
// String reverse
if (!String.prototype.reverse) {
	String.prototype.reverse = function() {
		return Array.prototype.reverse.apply(this.split('')).join('');
	}
}

var str = 'abc1123aaa!2#%%#%';
var str2 = str.reverse();
console.log(str);
console.log(str2);