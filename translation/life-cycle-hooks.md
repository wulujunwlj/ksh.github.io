Exploring Angular 1.5:Lifecycle Hooks
==========

Angular 1.5 终于发布了，这个版本比以前的更加强大。很多新特性增加，一大堆的修复也在最近一次更大的版本中引入。如果你在关注我们的文章，你会知道我们喜欢对最新的和最大版本的 Angular 来一个总体概括。上一年我们在系列文章发表了关于1.3版本的博客 `Exploring Angular 1.3`。这篇文章开始我们将要开始一个系列叫做，你猜 "Exploring Angular 1.5"，第一个主题我们将要探索的就是关于 **Lifecycle Hooks**。让我们立刻开始！

## Lifecycle Hooks
Angular 中的 Lifecycle hooks 是在 Angular 2 alpha 版本中被首次引入的，他们或多或少受到 [Custom Elements lifecycle callbacks](http://webcomponents.org/articles/introduction-to-custom-elements/#lifecycle-callbacks) 的启发。说是 "受到启发" 我们的意思是，它们并不是完全一样。不仅仅是明明不一样，而且做的是不同的事情，还有更多的不同。一个带有 lifecycle hooks 的 Angular 2 组件拥有 ngOnInit(),ngOnDestroy(),ngOnChange() 以及其他更多的方法。从[官方文档](https://angular.io/docs/ts/latest/guide/lifecycle-hooks.html)中我们可以得到一个详细的概览。

然而，这篇文章是关于 Angular 1.5 的。因为 Angular 1 进化出了一条和 Angular 2的缺口尽可能小的路，一些 lifecycle 回调已经一直到当前的 "最好的Angular"。让我们一个个的来看看这些方法。

**注意：Angular lifecycle-hooks 是在 1.5.3 版本中引入的**

## $onInit()
这个生命周期钩子会在元素的所有控制器被创造并且他们所有的绑定初始化后被执行。意味着可以用来进行控制器的所有初始化工作。为了更好的理解这是怎样运转的，让我们来看一些代码：
```
var mod = angular.module('app', []);

function MyCmpController() {
    this.name = 'Pascal';
}

mod.component('myCmp', {
    template: '<h1></h1>',
    controller: MyCmpController
});
```

我们从 Angular 1.5 component myCmp 开始。组件有一个控制器和一个模板，在我们的例子中，我们的组件仅仅有一个 name 属性，并且插入 $ctrl 作为默认的 controllerAs 命名空间，这样做非常漂亮，因为我们不需要去启动它。

我们现在可以通过在控制器实例中定义钩子来把初始化工作移入 $onInit 生命周期钩子中。
```
function MyCmpController() {
    this.$onInit = function() {
        this.name = 'My Component';
    }
}
```

好，但是这又有什么大不了的？因为输出结果将会一致，我们现在有了好的副作用：当它的构造器被调用时，组件并没有做任何的初始化工作。想象一下，当我们初始化组件或者控制器时需要进行一些 http 请求操作。我们需要在创建组件时，注意模拟这些请求。现在我们有了一个更好的地方来处理这些事情。

### Intercomponent Communication
另外一个关于 $onInit 的美妙的事情就是，我们可以在自己的组件控制器中使用父组件的控制器，这些控制器被暴露出来是为了组件间的通信。这意味着甚至不需要增加 `link()` 方法来使用其他指令的控制器。

例如，如果我们创建了一个 `<tabs>` 组件和一个 `<tab>` 组件，后面的需要使用 TabsController 来登记自己再上面，我们可以简单的使用 require 属性请求它，并且直接通过控制器实例调用。
```
mod.component('myTab', {
    ...
    require: {
        tabsCtrl: '^myTabs'
    },
    controller: function() {
        this.$onInit = function() {
            this.tabsCtrl.addTab(this);
        }
    }
});
```

毕竟，这完美的匹配了我们在很久以前的[文章](http://blog.thoughtram.io/angularjs/2015/01/02/exploring-angular-1.3-bindToController.html)中所预言的。

## $onChanges()

## $onDestory()

## $postLink

[原文链接](http://blog.thoughtram.io/angularjs/2016/03/29/exploring-angular-1.5-lifecycle-hooks.html)