
JavaScript 面向对象编程指南
==========

## 第1章：引言
### 1.5 面向对象的程序设计
* 对象、方法、属性
    - 对象(名词)：事物(人和物)在程序设计语言中的表现形式
    - 方法(动词)：对象动作
    - 属性(形容词)：对象特征
* 类
    - 类：对象的模板
    - 对象：类的实例
    - JS 中没有类，一切都是基于对象的，依赖于一套原型系统(prototype)。原型也是一种对象
    - 关于原型和对象的描述：将现有的对象(原型)扩展成了一个新对象(实例)
* 封装
    - 主要用于阐述对象中所包含的内容。主要由两部分组成
        + 相关的数据(属性)
        + 基于这些数据所能做的事(方法)
    - 使用对象时只关注所操作对象的接口，而不必去关心具体实现
    - 通过函数作用域隐藏数据，保护程序的隐秘性
* 聚合
    - 聚合，有时候也叫组合。是指将几个现有对象合并成一个新对象的过程
* 重用与继承
    - 重用
    - 继承
        + 通过继承，可以实现对现有代码的重用
        + 传统的 OOP 环境中，继承通常指类与类之间的关系
        + JS 的继承只发生在对象之间
        + 重定义继承方法的过程叫做覆写
* 多态
    - 不同对象通过相同的方法调用来实现各自行为的能力，称之为多态

## 第2章：基本数据类型，数组，循环及条件表达式
### 2.4 基本数据类型综述
* JS 中有五大基本数据类型
    - 数字
    - 字符串
    - 布尔值
    - undefined
    - null
* 任何不属于基本类型的东西都属于对象
* 数字类型可以存储的数据包括：正负整数、浮点数、十六进制数、八进制数、指数、特殊数值：NaN、Infinity、-Infinity
* 字符串类型存储的是一对引号之间的所有字符
* 布尔类型的值只有两个：true、false
* null类型的值只有一个：null
* undefined 类型的值只有一个：undefined
* 在转换为布尔类型时，6种值会被转换为false
    - ''
    - null
    - undefined
    - 0
    - NaN
    - false

### 数组
* typeof array === 'object'

## 第3章：函数
### 3.1 什么是函数
* 函数本质上是一种代码的分组形式通过这种形式赋予某组代码一个名字，以便于日后重用时调用
* 函数的组成
    - function 子句
    - 函数名称
    - 函数形参
    - 函数体
    - return 子句(默认返回 undefined。一个函数只能有一个返回值)

### 3.3 变量的作用域
* JS 中不能为变量定义特定的块作用域，但可以定义其所属的函数作用域
* 全局变量指的是声明在所有函数之外的变量；局部变量是指在某个函数中定义的变量

### 3.4 函数也是数据
* 对于 JS 来说，函数也是一种数据类型
* 匿名函数：没有被赋值给变量和赋予名字的函数
* 回调函数：将函数A传递给函数B，并由B来执行A时，A就成了一个回调函数(callback functions)。如果A还是一个无名函数，就称为匿名回调函数
* 回调函数的优势
    - 可以不做命名的情况下传递函数(节省全局变量)
    - 可以将一个函数调用操作委托给另一个函数(节省代码编写工作)
    - 有助于提升性能
* 自调函数：在定以后自行调用
    - 优点：不会产生任何全局变量
    - 缺点：无法重复执行
    - 适用场合：执行一次性任务或初始化任务
* 内部(私有)函数
    - 可以确保全局命名空间的纯净性
    - 私有性
* 返回函数的函数
* 能重写自己的函数
    - 可以用来执行某些一次性的初始化工作

### 3.5 闭包
* 作用域链
* 词法作用域
    - JS 中，每个函数都有一个自己的词法作用域。也就是说，每个函数在**被定义时**(而非执行时)都会创建一个属于自己的环境(作用域)
* 利用闭包突破作用域链
```
// 闭包实现方式1：返回一个函数
function f() {
    var b = 'b';

    return function() {
        return b;
    }
}
// 闭包实现方式2：函数体内创建一个新的全局函数
var n;

function f() {
    var b = 'b';

    n = function() {
        return b;
    }
}
// 函数所返回的是作用域本身，而不是该作用域中的变量或变量当前所返回的值
function f(arg) {
    var n = function() {
        return arg;
    }

    arg++;
    return n;
}
// 循环中的闭包：错误的方式
function f() {
    var a = [];
    var i;

    for (i = 0; i < 3; i++) {
        a[i] = function() {
            return i;
        }
    }

    return a;
}
// 循环中的闭包的实现方式：正确方式1
function f() {
    var a = [];
    var i;

    for (i = 0; i < 3; i++) {
        a[i] = (function(x) {
            return function() {
                return x;
            }
        })(i);
    }
}
// 非闭包实现方式
function f() {
    function makeClosure(x) {
        return function() {
            return x;
        }
    }

    var a = [];
    var i;
    for (i = 0; i < 3; i++) {
        a[i] = makeClosure(i);
    }

    return a;
}
```
    - 闭包实现方式1：返回一个函数
    - 闭包实现方式2：函数体内创建一个新的全局函数
    - 如果一个函数需要在其父级函数返回之后留住对父级作用域的链接的 话，就必须要为此建立一个闭包
    - 函数所返回的是作用域本身，而不是该作用域中的变量或变量当前所返回的值
    - 循环中的闭包:循环中的每个闭包都指向了一个共同的局部变量i的引用，因此只能返回i的当前值(循环结束时，当前值为3)。
* Getter 与 Setter
    - 保护变量，利用 getter 获取变量的值，利用 setter 设置变量的值，从而确保局部变量的不可直接访问性
* 迭代器
```
function setup(x) {
    var i = 0;

    return function() {
        return x[i++];
    }
}
```

## 第4章：对象
### 4.1 从数组到对象
* 数组文本标识法(array literal notation)：用[]定义数组的方法
* 对象文本标识法(object literal notation)：用{}定义对象的方法
* 数组包含的是元素，对象包含的是属性
* 哈希表、关联型数组
    - 一般性数组：也叫索引型数组或者枚举型数组(通常以数字为键值)
    - 关联型数组：也叫哈希表(通常以字符串为键值)
* 构造函数
    - 使用 new 调用构造函数时，this 指向新创建的对象，并且会返回新创建的对象
    - 不使用 new 调用构造函数时，函数会返回 undefined，如果函数内部使用 this，相应的 this 会指向全局变量，增加的属性会挂在全局变量
    - 使用构造器创建对象时，会赋予对象一个构造器属性(constructor property)。该属性实际是一个指向用于创建该对象的构造器函数的引用
    - 如果对象是通过对象文本标识法创建的，实际上它是由内建构造器 Object() 函数所创建的
    - 如果构造函数返回一个对象，将不会再返回 this

### 4.2 内建对象
* 数据封装类对象：Object,Array,Boolean,Number,String
    - Object
        + 空对象包含的方法和属性：
            * 返回构造器函数的构造器属性
            * 返回对象描述字符串的 toString() 方法
            * 返回对象单值描述信息的 valueOf() 方法。一般情况下，返回的就是对象本身
    - Array
        + 为数组的非数字属性赋值会被忽略
        + 设置 length 属性大于当前元素个数时，多余部分会被自动创建为空对象；当设置属性小于当前元素个数时，多余部分会被移除
        + 数组方法
            * push/pop
            * sort
            * join
            * slice/splice
    - Function
        + 3种创建函数的方式？
        + 尽量避免使用 Function() 构造器，因为它与 eval 和 setTimeout() 一样，始终会以字符串的形式通过 JS 的代码检查
        + Function 对象的属性
            * 函数对象中含有一个构造器属性，其引用就是 Function() 构造器函数
            * Function 对象中有一个 length 属性，用于记录该函数所拥有的参数数量
            * caller 属性(ECMA 标准之外)
        + Function 对象的方法
            * toString() 返回函数的源代码
            * call()/apply()
        + arguments
            * arguments 看起来像数组，但是它实际上是一个类似数组的对象。包含索引元素和 length 属性
            * callee 属性：引用当前被调用的函数对象
    - Boolean
        + new Boolean() 将会创建一个新的对象，调用 valueOf() 方法获得其布尔值
    - Number
        + 被当做一般对象时，会试图将任何值转换为数字，与 parseInt() 或 parseFloat() 的作用基本相同
        + 当做构造器函数时，会创建一个对象
        + 属性：Number.MAX_VALUE/Number.MIN_VALUE/Number.POSITIVE_INFINITY/Number.NEGATIVE_INFINITY/Number.NaN
        + 方法：toFixed(),toPrecision(),toExponential(),toString([radix])
    - String
        + String 对象实际上就像一个字符数组。也包含索引属性和length 属性
        + 把基本类型的字符串当做对象使用时，后台会执行相应的 String 对象创建(与销毁)操作
        + 如果不通过 new 操作符来调用 toString()，会试图将其参数转换为一个基本字符串，如果参数是一个对象的话，就等于调用该对象的 toString() 方法
        + 方法：
            * 返回新的字符串：toUpperCase(),toLowerCase(),charAt(),indexOf(),lastIndexOf(),slice(),substring(),split(),concat()
            * 修改源字符串：
        + slice(startIndex, endIndex) 与 substring(startIndex, endIndex)
            * 第二个参数都是区间的末端位置，而不是区间长度
            * 当参数是负值时，substring 会当做0，slice 会把它与字符串长度相加
        + 
* 工具类对象：Math、Date、RegExp 等用于提供遍历的对象
    - Math
        + Math 既不能当做一般函数调用，也不能用于 new 操作符来创建对象
        + Math 只包含一系列方法和属性、用于数学计算的内建对象
        + Math 的属性都是不可修改的
        + 属性：Math.PI,Math.SQRT2,Math.E,Math.LN2,Math.LN10
        + 方法：Math.random(),Math.round(),Math.floor(),Math.ceil(),Math.min(),Math.max(),Math.sqrt(),Math.power()
        + 获取 (min, max) 之间的随机数：((max - min) * Math.random()) + min
    - Date
        + 构造方法的参数
            * 无参数
            * 一个用于表示日期的字符串
            * 分别传递日、月、时间等值
            * 一个 timestramp 值(从协调世界时 1970年1月1日0时0分0秒起至现在的总秒数，不包括闰秒)
    - RegExp
        + JS 采用的是 Perl5 的语法
        + 定义方式
            * RegExp() 构造器：new RegExp('j.*t')
            * 文本定义方式：/j.*t/
        + 属性
            * global
            * ignoreCase
            * multiline
            * lastIndex
            * source
        + 方法：
            * test()：返回布尔值
            * exec()：返回一个由匹配字符串组成的数组
        + String 对象以正则表达式对象为参数的方法
            * match()：返回包含匹配内容的数组
            * search()：返回第一个匹配内容所在的位置
            * replace()
            * split()
* 错误类对象：包括一般性错误对象以及其他各种特殊的错误类对象
    - EvalError
    - RangeError
    - ReferenceError
    - SyntaxError
    - TypeError
    - URIError
## 第5章：原型
### 5.1 原型属性
* 使用 for-in 循环遍历对象
    - 不是所有属性都会在 for-in 循环中显示。已经被显示的属性被称为是可枚举的，可以通过对象的 propertyIsEnumerable() 判断可枚举的属性
    - 原型链中的可枚举原型属性也会被显示，可以通过 hasOwnProperty() 方法判断属性是对象自身属性还是原型属性
    - 对于所有的原型属性， propertyIsEnumerable() 都会返回 false，包括在 for-in 循环中可枚举的属性
* isPrototypeOf()：判断当前对象是否是另一个对象的原型
* __proto__(firefox 中)：指向相关原型的链接
    - 修改对象的 constructor 以后，仍然能够访问对象原型链上的属性，说明对象中存在一个指向相关原型的链接，即 __proto__

### 扩展内建对象
* String reverse
```
String.prototype.reverse = function() {
    return Array.prototype.reverse.apply(this.split('')).join('');
}
```
* 如果想要通过原型为某个对象添加一个新属性，务必先检查一下该属性是否已经存在
* 一些原型陷阱(P157)
    - 当对原型对象执行完全替换时(obj.constructor={})，可能会触发原型链中某种异常(exception)
    - prototype.constructor 属性是不可靠的
* 重写某对象的 prototype 时，重置相应的 constructor 属性是一个好习惯

## 第6章：继承
### 原型链
* JS 中的函数都有一个名为 prototype 的对象属性，该函数被 new 操作符调用时会创建一个对象，并且该对象中会有一个指向其原型对象的秘密链接。通过该秘密链接，可以在新建的对象中调用相关原型对象的方法和属性。而原型对象本身也具有对象固有的普遍属性，因此本身也包含了指向其原型的链接。因此就形成了一条链，称之为原型链
* obj.toString() 查找时原型链的处理过程
    - 遍历对象的所有属性，查找 toString() 方法
    - 查看 obj.__proto__ 所指向的对象(依次向上遍历查找)
    - 找到 toString() 方法并返回，或者报错
* 

## 第7章：浏览器环境

## 第8章：编程模式与设计模式
