/**
 * 加载原理：
 * 1. 动态创建脚本，并添加到 head 元素中：createElement('script') appendChild(script)
 * 2. fn.toString().match(/.require(("|')[^)]*("|'))/g) 将模块转换为字符串，然后通过正则表达式，匹配每个模块中的依赖文件
 * 3. 建立脚本加载队列
 * 4. 递归加载，分析完依赖后，按照依赖出现的位置，加载到客户端
 * 5. 为每一个明明的模块简历缓存，即 module[name] = callback;
 * 6. currentScript：对于匿名模块，通过 currentScript 来获取文件名，存入缓存中
 */

/**
 * 动态创建脚本
 */
function _createScript(url) {
	var script = document.createElement('script');
	var self = this;

	// 设置为异步
	script.async = true;
	script.src = url + '.js';

	// 脚本加载完成事件
	if ('onload' in script) {
		script.onload = function(evt) {
			return _scriptLoaded.call(self, script);
		};
	} else {
		script.onreadystatechange = function() {
			if (/loaded|complete/).test(node.readyState) {
				self.next();
				_scriptLoaded(script);
			}
		}
	}

	head.appendChild(script);
}

/**
 * 分析依赖
 */
function _analyseDepend(func) {
	var firstReg = /.require(("|')[^)]*("|'))/g,
			secondReg = /(("|')[^)]*("|'))/g,
			lastReplaceRge = /(("|')|("|'))/g;

	var string = func.toString();
	var allFiles = string.match(firstReg);
	var newArr = [];
	if (!allFiles) {
		return '';
	}

	allFiles.map(function(v) {
		var m = v.match(secondReg)[0].replace(lastReplaceRge, '');

		if(!modules[_analyseName(name)]) {
			newArr.push(m);
		}
	});

	if(newArr.length > 0) {
		return newArr;
	} else {
		return '';
	}
}

/**
 * 建立脚本加载队列
 */
function _Chain() {
	this.cache = [];
}

_Chain.prototype.after = function(fn) {
	this.cache.push(fn);
	this.cur = 0;

	return this;
}
_Chain.prototype.passRequest = function() {
	var result = 'continue';

	while (this.cur < this.cache.length && result === 'continue') {
		result = this.cache[this.cur++].apply(this, arguments);
		if (this.cur === this.cache.length) {
			this.clear();
		}
	}
}