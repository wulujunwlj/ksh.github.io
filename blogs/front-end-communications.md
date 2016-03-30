前端通信方式
==========

## Ajax
```
/**
 * Ajax 方法
 * @param  {[type]} ) {	var        getXHR [description]
 * @return {[type]}   [description]
 */
var sendAjax = (function() {
	var getXHR = (function() {
		var xhr;

		if (window.XHRHttpRequest) {
			xhr = new new XMLHttpRequest();
		} else {
			xhr = new ActiveObject('Microsoft.XMLHTTP');
		}

		return xhr;
	})();

	return function(url, opts) {
		var xhr = getXHR(),
			data;

		xhr.onreadystatechange = function() {
			if (xhr.readyState === 4 || xhr.status === 200) {
				data = JSON.parse(xhr.responseText);

				opts.callback(data);
			}
		}

		xhr.sendRequestHeader('Content-Type', 'application/json');
		xhr.open(opts.method, url);
		xhr.send(JSON.stringify(opts.data));
	}
})();

sendAjax('demo', {
	callback: function(data) {
		// 
	},
	data: {
		name: 'abc',
		age: 8
	}
});
```

## JSONP
* JSONP 最大的优势就是实现跨域的作用
* JSONP 利用 script 的 src 属性，实现跨域的功能
```
// Client 
<script>
function processJSON(json) {
	//
}
</script>
<script src="http://www.baidu.com?callback=proecessJSON&name=abc&age=8"></script>

// Server
const util = require('util'),
	http = require('http'),
	url = require('url');

let data = JSON.stringify({
	message: 'I have already received...'
});
http.createServer(function(req, res) {
	req = url.parse(req.url, true);

	if (!req.query.callback) {
		res.end();
	}
	console.log(`name is ${req.query.name} and age is ${req.query.age}`);
	req.writeHead(200, { 'Content-Type': 'application/javascript' });
	res.end(req.query.callback + '("' + data + '")');
}).listen(80);
```

## Reference
* [前端通信进阶](https://segmentfault.com/a/1190000004682473)
* [通过源码解析 Node.js 中一个文件被 require 后所发生的故事](https://segmentfault.com/a/1190000004695582)
* 