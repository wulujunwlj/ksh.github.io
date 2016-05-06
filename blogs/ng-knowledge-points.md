ng 的知识点总结
==========

## directive
* restrict 中 E 和 A 分别代表什么？有何区别？
* compile,controller,link 分别代表什么？有什么作用
* transclude 使用方法
* priority 的作用方式？
* [Creating Custom Directives](https://docs.angularjs.org/guide/directive)
* [angularjs directive 实例 详解](http://blog.51yip.com/jsjquery/1607.html)
* 

## service
* 定义 service 有几种方式？有何区别？各种方式的使用方法有何异同？
* service 的作用是什么？
* [AngularJS: Factory vs Service vs Provider](http://tylermcginnis.com/angularjs-factory-vs-service-vs-provider/)
* [Angular.js Services](http://www.cnblogs.com/whitewolf/p/angular-services.html)
* 

## filter
* [如何在angularjs的自定义指令内部定义自定义过滤器？](https://www.zhihu.com/question/41912122)
* $stateful filter 是什么意思？
* 

## inner directive
* ng-model 的执行过程？单向绑定是什么原理？为什么要引入单项绑定？
* ng-bind/ng-bind-html/ng-bind-template
* 

## others
* Angular 的执行过程？
* Angular 的启动方式？
* $scope 是作为 controller 与 view 的链接，那么当一个最简单的 Angular app 不使用 ng-controller 时，对应的 view 的数据绑定在哪里？[参考](http://blog.jobbole.com/48593/)
* 

### Dependency Injection
* [Develop Guide - Dependency Injection](https://docs.angularjs.org/guide/di)
* [ngnice - 依赖注入](http://docs.ngnice.com/guide/di)
* [笔记](https://github.com/wulujunwlj/ksh.github.io/blob/master/blogs/ng-develop-guide/DI.md)
* 

### 遇到的问题
* Angular 的依赖注入
> 代码混淆时，没有按照规则书写的代码被压缩成了 a,b...，只能每个文件修改
> Angular 的 invoke 方法；添加代码对注入的服务进行判断；寻找 jshint 的解决方案；寻找 grunt 的解决方案

* filter 中遇到的异步问题
> $stateful = true;

* 定义指令时，绑定的属性以 `data-` 开头时获取不到对应属性名的问题