same origin policy(JS 的同源策略)
==========

[浏览器同源政策及其规避方法](http://www.ruanyifeng.com/blog/2016/04/same-origin-policy.html)

* 浏览器的基石是 "同源策略"(same origin policy)
* 是由 Netscape 公司于 1995 年引入浏览器
* 什么叫同源？三个相同：
    - 协议相同
    - 域名相同
    - 端口相同
* 同源策略的目的：保证用户信息的安全，防止恶心的往回走哪窃取数据
* 提交表单不受同源策略的限制
* 非同源的限制范围：
    - cookie,localStorage 和 indexDB 无法读取
    - DOM 无法获得
    - Ajax 请求不能发送
* 