
进击 Node.js
==========

from:[进击 Node.js](http://www.imooc.com/learn/348)

## 安装 Node.js
* 版本：偶数位为稳定版本，基数为非稳定版
* 安装 git bash
* npm install -g n：管理 Node 版本
* 模块与包管理工具
    - Commonjs 是一套规范
    - Node.js 的每个文件可以看做一个独立的模块
    - 模块的流程
        + 创建模块：`teacher.js`
        + 导出模块：`exports.add = function() {}`
        + 加载模块：`var teacher = require('./teacher');`
        + 使用模块：`teacher.add('Scott')`
* Node.js API
    - URL/URI：URL 是 RUI 的子集
    - HTTP 及相关的知识：
        + 域名解析
            1. chrome 搜索自身的 DNS 缓存
            2. 搜索操作系统自身的 DNS 缓存
            3. 读取本地的 HOST 文件
            4. 浏览器发起一个 DNS 的系统调用
        + 请求方法：GET,POST,PUT,DELETE,HEAD,TRACE,OPTIONS
        + 状态码:
            * 1XX:请求已接受，正在处理
            * 2XX:请求已接受，已被处理
            * 3XX:重定向
            * 4XX：请求错误
            * 5XX：服务器端错误
            * 200：请求成功
            * 400：有语法错误
            * 401：没有权限处理
            * 403：服务器拒绝提供服务(没有权限等)
            * 404：请求资源不存在
            * 500：服务器端发生的不可预期的错误
            * 503：服务器端不能处理当前请求
        + 
    - HTTP 模块
        + 什么是回调
        + 什么是同步，什么是异步？
        + 单线程、多线程
        + 阻塞、非阻塞
        + 什么是事件
        + 什么是事件驱动
        + 什么是基于事件驱动的回调
        + 什么是事件循环(event-loop)
        + 什么是作用域，什么是上下文？(this,apply,context,global,实现继承)
    - github 项目浏览中，输入 `t` 可进行文件搜索
* 

## Node.js API 讲解

## Node.js 搭建小程序