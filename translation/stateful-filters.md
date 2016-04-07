Exploring Angular 1.3:Stateful filters
==========

Angular 1.3 带来很多酷的特性和提高。我们已经包含了他们中的一部分。例如你可以阅读关于`单次绑定`,`ngModelOptions` 或者新加的`Angular-hint`模块来帮助你写出更加好的 Angular 代码。

但是事实证明，虽然1.3版本看起来像是一个未来的版本，他带来一个可能打破你现有代码的变化：所有的过滤器默认都是`stateless` 的。在这片文章中，我们就来看看这意味着什么，以及我们可以怎么处理这个问题。

## 你知道的 `filter` 的行为
总之，我想我不需要太过深入的解释如何使用 `filters`。我们在插值表达式中使用一个 `|` 标识符，并且可以通过 `:` 符号的链式方式传入额外的参数。

例如，下面的例子中，我们使用了 `json` filter 来转换一个 JS 对象为 JSON 字符串：
> `{{ jsonExpression | json }}`

`jsonExpression` 设置为类似于 `{ 'name': 'value' }` 的值时，过滤器将会返回类似于下面这样的字符串：
> ```
> {
>   "name": "value"
> }
> ```

如果我们使用可以配置额外参数的过滤器，可以通过使用连接符 `:` 传入这些参数到表达式中。下面的例子使用了 `currency` 过滤器来相应的格式化给定的字符串并且使用可选的标识符参数来改变这个用例默认的 currency 标识符。
> `{{ amount | currency: '￥' }}`

好，因此这些都是很直接的，对吧？过滤器使用表达式作为输入来操控表达式的值，理想情况下返回一个字符串，以供我们可以在 HTML 中直接使用。

我们可以更进一步，声明一个依赖于另一个服务的自定义过滤器来操控给定的输入。假设这个过滤器像这样：
```
angular.module('myApp', [])
.filter('customFilter', ['someService', 
    function(someService) {
        return function customFilter(input) {
            input += someService.getData();

            return input;
        }
    }
]);
```

在这个例子中我们定义了一个依赖于 `someService` 的服务，这个特别的服务显然拥有一个方法 `getData()` ，可以用来改变需要返回的 `input` 的值。

再一次声明，这都是显而易见的。当使用依赖注入(Dependency Injection)时，Angular 中的 filters 遵循其他组件例如：services,factories 等一样的规则。因此，基本上来讲，filter 组件中使用依赖是完全正确和有效的。然而，有依赖的过滤器通常是 `stateful`(有状态的) 。这也是代码可能出错的地方。

但是，这意味着什么？为什么这是一个问题？然我们来看看 Angular 1.3 中的而改变，以帮助我们更好的理解是什么引起了这个问题。

## 1.3 中的 `filters`
为了使 Angular 更加快，1.3 版本中引入了一些改变来处理性能提升的问题。其中之一就是 filters 的默认行为。我们已经讨论了 filters 是做什么的，以及可以怎样使用它们，但是我们并没有讨论实际上它们带来了相当大的缺点。每一个过滤器都创建了一个新的 watcher。注册、使用过多的 watchers会拖慢app，因为越多的 watchers 被注册，在 `$digest` 循环中就需要越多的工作。这就是为什么我们通常应该避免使用太多的过滤器。

然而，`Igor Minar` 说过 `Angular 1.3 是最好的 Angular 版本`,这是有原因的。

版本 1.3 中，过滤器更加智能了。它们默认就会缓存计算过的值，因此不需要每时每刻都重新计算。回到我们简单的 `{{ jsonExpression | json }}` 的例子上来，表达式只会在 jsonExpression 改变了以后才会重新计算，这使得我们的代码执行得更加快。

为了使其像这样运作，Angular 假设：只要传入的表达式没有改变，表达式的结果也就不会改变。这是没有状态的(stateless)。并且，这也是我们代码可能出错的地方，想想看当我们的过滤器依赖于其他服务，比如 customFilter 时，这意味着什么。

但是为了得到更好的判断，我们来看看来自 `angular-translate` 模块的 `translate` 过滤器。它用来转换翻译 id 来在已注册的翻译表里面查找，使用 `$translate` 服务并且返回专用的翻译值。它是有状态的(stateful)。

这是看起来的样子：
> `{{ 'TRANSLATIONID' | translate }}`

正如我们已经讨论过的，Angular 缓存了这个表达式的值，并且不会重新计算，除非 `TRANSLATIONID` 改变。这实际上是一个问题，因为 `TRANSLATIONID` 不会改变。当用户改变了语言，给定的 翻译 id 再一次被过滤器在翻译表中查询，但是，表达式仍然保持不变。

因为，我们应该怎样告诉 Angular，有状态的表达式需要被重新计算？相当简单，我们所需要做的仅仅是给我们的过滤器增加一个 `$stateful` 属性来标识它为有状态的。相应的，我们来看看 `customFilter` 被标识的示例：
```
angular.module('myApp', [])
.filter('customFilter', ['someService', 
    function(someService) {
        function customFilter(input) {
            input += someService.getData();

            return input;
        }

        customFilter.$stateful = true;

        return customFilter;
    }
]);
```

这就是了。设置 `$stateful` 属性为 `true` 耍了个花招(angular-translate 过滤器已经包含了这个标识)。记住，总体来说推荐避免使用有状态的过滤器，因为这些过滤器的执行不能被 Angular 优化。最好是创建获取到所有需要信息作为参数的无状态的过滤器。

总而言之，在Angular 1.3 中，标记你的有状态过滤器为 `stateful` 来确保他们正确运行。希望这篇文章说清楚了为什么这些改变是必须的。

[原文链接](http://blog.thoughtram.io/angularjs/2014/11/19/exploring-angular-1.3-stateful-filters.html)