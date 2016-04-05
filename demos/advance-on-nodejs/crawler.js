
var http = require('http');
var fs = require('fs');
var url = 'http://www.imooc.com/learn/348';

http.get(url, function(res) {
	var html = '';

	res.on('data', function(data) {
		html += data;
	});

	res.on('end', function() {
		// console.log(html);
		fs.writeFile('crawler.html', html);
	});

}).on('error', function() {
	console.log('获取课程数据出错');
})