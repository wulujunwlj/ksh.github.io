
function getRGB(colorStr) {
	var rVal, gVal, bVal;
	colorStr = colorStr.substr(1, 6);

	rVal = parseInt(colorStr.substr(0, 2), 16);
	gVal = parseInt(colorStr.substr(2, 2), 16);
	bVal = parseInt(colorStr.substr(4, 2), 16);

	return 'rgb(' + rVal + ', ' + gVal + ', ' + bVal + ')';
}

console.log(getRGB('#00ff00'));
console.log(getRGB('#2Eff34'));