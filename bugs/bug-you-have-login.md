一次处理"您已登陆"的问题跟踪
==============

## 问题
1. 打开首页，自动重定向到登陆页
2. 输入用户名和密码，登录
3. 提示 "您已登录",并停留在提示页面
4. 多刷新几次页面，有一定概率可以进入项目

## 解决思路
1. 页面没有成功跳转到项目页面，可以打开控制台看看有没有出错提示，跟踪一下对应 `bug`
2. (我的想法)提示已经登录，说明前面判断用户信息的操作已经成功，对应用户的登录信息已经记录在 `session` 或者 `$rootScope` 中，可以跟踪一下页面跳转的操作：对应的 JS 逻辑中是否有 `$state.go` 或者 `location.href` 的赋值

## 跟踪过程
1. 在发送请求判断登录信息后，ui-router 提供了 `$stateChangeStart`,`$stateChangeSuccess`,`$stateChangeError` 事件触发方法[没有发现问题]
2. 项目登录后的根路由 `app` 使用了 `$oclazyLoad` 延迟加载文件，`promise` 的 `then` 方法只提供了 `resolve` 的处理逻辑，没有提供 `reject` ，跟踪对应延迟加载的文件，发现了报错，因为没有 `reject` ，导致代码没有执行下去
```
resolve: {
    deps: ['$ocLazyLoad', 'appConfig', function($ocLazyLoad, appConfig) {
        return $ocLazyLoad.load(appConfig.initResources)
            .then(function(data) {
                return $ocLazyLoad.load(appConfig.preloadResources);
            }
            // 加上了这里的逻辑
            , function(msg) {
                // 加载文件出错的处理方法
            });
    }],
},
```

## 想到的问题点
1. 所有操作 `success` 都对应一个 `error` 的处理方法，同理，一个 `then` 的 `resolve` 回调方法也需要对应一个 `reject` 的回调方法(无法保证一次后台操作或者异步处理一定成功)
2. 前台抛出的错误(error)或者日志(log)也需要保存下来，以备查错(需要定义日志级别，打开/关闭，是否发送服务器等配置)
3. 基于第2条，团队需要规范代码，普通打印的 log 语句不需要记录下来

## 参考
* [log4web](https://github.com/houyhea/log4web)
* [log4js-node](https://github.com/nomiddlename/log4js-node)
* angular.js $log
