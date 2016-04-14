High Performance Web Sites
==========

14 steps to faster-loading web sites
----------

## 绪言A：前端性能的重要性

* 性能黄金法则：只有 10% ~ 20% 的最终用户响应时间花在了下载 HTML 文档上。其余的 80% ~ 90% 时间花在了下载页面中的所有组件上。

## 绪言B: HTTP 概述
* HTTP(Hyper Text Transfer Protocol)：是浏览器和服务器通过 Internet 进行相互通信的协议。HTTP 规范由 World Wide Web Consortinu(W3C)和 Internet Engineering Task Force(IETF) 进行编制，文档是 RFC2616
* HTTP 是一种客户端/服务器协议，由请求和响应构成
* 请求类型：GET、POST、HEAD、PUT、DELETE、OPTIONS、TRACE
* GET 请求包含一个 URL，然后是头
* HTTP 响应包含状态码、头和响应体
* 压缩
    - 浏览器使用 `Accept-Encoding` 头来声明支持压缩
    - 服务器使用 `Content-Encoding` 头确认响应被压缩
* 条件 GET 请求
    - 如果浏览器在其缓存中保留了组件的一个副本，但并不确定它是否仍然有效，就会生成一个条件 GET 请求
    - 典型情况下，缓存副本的有效性源自其最后修改时间
    - 具体操作流程为：
        + 浏览器根据上一次响应的 `Last-Modified` 头，确定组件最后的修改时间
        + 浏览器使用 `If-Modified-Since` 头将最后修改时间发送给服务器
        + 如果组件自生成日期以来没有改变过，服务器会返回一个 `304 Not Modified` 状态码，并且不再发送响应体
    - `Expires`
        + 条件 GET 请求和 304 响应仍然需要在客户端好服务器之间进行一次往返确认，以执行有效性检查
        + `Expires` 头通过明确指出浏览器是否可以使用组件的缓存副本来消除这个需要
        + `Expires` 头制定了组件的 **过期时间**
    - Keep-Alive
        + 为什么使用持久连接：HTTP 的早期实现中，每个 HTTP 请求都要打开一个 `socket` 连接。导致效率很低，因为一个 Web 页面中的很多 HTTP 请求都指向同一个服务器
        + 持久连接(Persistent Connection)解决了多对一请求服务器导致的 socket 链接低效性的问题。使浏览器可以在一个单独的连接上进行多个请求
        + 可以通过设置浏览器和服务器的 `Connection` 头来指出对 `Keep-Alive` 的支持
        + 浏览器或服务器可以通过发送一个 `Connection: close` 头来关闭连接
        + HTTP 1.1 中定义的管道可以在一个单独的 socket 上发送多个请求而无须等待响应
        + 管道的性能要优于持久连接，但是 IE(包括7)都不支持管道，FF 自从版本2开始默认也是关闭此功能
        + 建立新的安全 `socket`(HTTPS) 连接需要消耗更多的时间
    - 
* 


## 1. 减少 HTTP 请求
* 图片地图(Image Maps)
* CSS Sprites
* 内联图片(Inline Images)
* 合并脚本和样式表(Combined Scripts and Stylesheets)

## 2. 使用内容发布网络(Use a Content Delivery Network)

## 3. 添加 Expires 头(Add an Expires Header)
* Expires 头(Expires Header) - expires:到期，有效期
    - 浏览器(和代理)使用缓存来减少 HTTP 请求的数量，并减少 HTTP 响应的大小，使 Web 页面加载得更快。
    - Web 服务器使用 Expires 头来告诉 Web 客户端它可以使用一个组件的当前副本，知道指定的时间为止
* Max Age 和 mod_expires(Max Age and mode_expires)
    - HTTP 1.1 引入了 Cache-Control 头来克服 Expires 头的限制
    - Expires 头使用一个特定的时间，要求服务器和客户端的时钟严格同步。另外，过期日期需要经常检查，并且一旦未来这一天到来了，还需要在服务器配置中提供一个新的日期
    - Cache-Control 使用 max-age 指令指定组件被缓存多久:Cache-Control: max-age=315360000
    - 当同时指定两个响应头 - Expires 和 Cache-Control max-age 时，max-age 指令将会重写 Expires 头
    - mod_expires Apache 模块:http://httpd.apache.com/docs/2.0/mod/mod_expires.html
* 空缓存 VS 完整缓存(Empty Cache vs. Primed Cache)
    - 
* 不仅仅是图片(More Than Just Images)
    - 长久的 Expires 头应该包含任何不经常变化的组件，包括脚本、样式表和 Flash 组件
    - HTML 文档不应该使用长久的 Expires 头，因为它包含动态内容，这些内容在每次用户请求时都将被更新
* 修订文件名(Revving Filenames)
    - 
* 
## 4. 压缩组件
## 5. 将样式表放在顶部
## 6. 将脚本放在d底部
## 7. 避免 CSS 表达式
## 8. 使用外部 JavaScript 和 CSS
## 9. 减少 DNS 查找
## 10. 精简 JavaScript
## 11. 避免重定向
## 12. 移除重复脚本
## 13. 配置 ETag
## 14. 使用 Ajax 可缓存
