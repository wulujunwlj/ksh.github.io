jQuery 插件开发
==========

## 
* jQuery 插件开发包括两种
    - 类级别的插件开发：给 jQuery 添加新的全局函数，相当于给 jQuery 类本身添加方法。jQuery 的全局函数就是属于 jQuery 命名空间的函数
    - 对象级别的插件开发：给 jQuery 对象添加方法
```
// 类级别
jQuery.myPlugin = {
    foo: function foo() {
        console.log('foo function');
    },
    bar: function bar(opts) {
        console.log('bar function.');
    }
}
$.myPlugin.foo();
$.myPlugin.bar('test');

// 对象级别
(function($) {
    $.fn.pluginName = function (options) {
        var opts = $.extend({}, $.fn.pluginName.defaults, options);

        //
    };

    $.fn.highlight.defaults = {
        // 
    }
})(jQuery);
```
* 参考 [cycle 插件](https://github.com/malsup/cycle) 的处理
* [jquery-metadata](https://github.com/jquery-archive/jquery-metadata)
* [jquery-dotdotdot](https://github.com/FrDH/jQuery.dotdotdot)
* 