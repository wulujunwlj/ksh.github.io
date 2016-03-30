Angular Dependency Injection
==========

* 每个 Angular 应用都有一个 `injector` 对象。这个 `injector` 是一个服务定位器，负责创建和查找依赖
* 依赖声明的方法
    - 推断依赖：函数的参数名直接使用依赖名(使用代码混淆时报错)
    - $inject 注释：使用 `$inject` 属性标注依赖服务(参数顺序需要一致)
    - 行内注释(`[]` 形式，标注指令时使用 `$inject` 方式时，因为需要一个临时变量而导致代码膨胀)
```
// 推断依赖
function MyController($scope, greeter) {}
// $inject 注释
function MyController = function(renamed$scope, renamedGreeter) {}
MyController['$inject'] = ['$scope', 'greeter'];

var greeterFactory = function(renamed$window) {};
greeterFactory['$inject'] = ['$window'];
someModule.factory('greeter', greeterFactory);
// 行内注释
someModule.factory('greeter', ['$window', function(renamed$window) {}]);
```
* 使用 DI
    - 控制器中(控制器负责应用操作逻辑的 JS 类)
    - 工厂方法中(工厂方法负责创建 Angular 中的绝大多数对象。工厂方法时注册在模块下的)
```
someModule.controller('MyController', ['$scope', 'dep', function($scope, dep) {
    $scope.method = function() {}
}]);

angular.module('myModule', [])
    .config(['depProvider', function(depProvider) {
        //
    }])
    .factory('serviceId', ['depService', function(depService) {
        //
    }])
    .directive('directiveName', ['depService', function(depService) {
        //
    }])
    .filter('filterName', ['depService', function(depService) {
        //
    }])
    .run(['depService', funtion(depService) {
        //
    }]);
```
* 使用场景

| 类别 | 可以使用 | 不能使用 |
| ---- | ----- | ----- |
| components | 'service' and 'value' components |
| controllers | any of the 'service' and 'value' components |
| run | service,value,constant | providers |
| config |provider,constant | service,value |

* 控制器有其他特殊的依赖项可以注入
    - $scope：因为控制器与元素的 DOM 节点相关。但是其他组件(例如服务)只能够注入 `$rootScope`
    - resolves：在定义 route 时初始化的控制器，resolve 对象可以在控制器里注入
* 