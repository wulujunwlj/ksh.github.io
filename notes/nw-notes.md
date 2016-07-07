# NW.js 学习笔记

## NW 目录结构：
* package.json
    ```
    {
        "name": "nw-demo",      
        "main": "index.html", 
        "nodejs": true,
        "node-main": "", 
        "description": "",
        "version": "",
        "keywords": [],
        "window": {
            "title": "",
            "icon": "",
            "toolbar": true,
            "frame": false,
            "width": 800,
            "height": 500,
            "position": "mouse"/"center"/"",
            "min_width": 400,
            "min_height": 200,
            "max_width": 800,
            "max_height": 600
        },
        "webkit": {
            "plugin": true
        }
    }
    ```
* index.html

### package.json 属性解析
* name: 可以包含"." 或者"_"或者"-"。不允许带空格。name必须全局唯一
* main: 起始页面
* nodejs: 是否启用 webkit 的 node 支持
* node-main: 
    - 指定一个 node.js 文件，当程序启动时，该文件会被执行，启动时间要早于 node-webkit 加载 html 的时间。它在 node 上下文中运行，可以用来实现类似后台线程的功能
    - 在 node-main 脚本中还可以访问全局的 "window" 对象，它指向 DOM 窗口。但是要等到页面加载完毕，才能使用
* single-instance: 是否只运行一个实例
* window: 设置窗口外观
    - title: 
    - width/height, min_width/min_height, max_width/max_height: 
    - toolbar: 是否显示导航栏
    - icon: 
    - position: 窗口打开时的位置
        + null
        + "mouse": 鼠标当前焦点
        + "center": 屏幕中央
    - as_desktop:
    - resizable: 
    - always-on-top: 
    - fullscreen: 
    - show_in_taskbar: 是否在任务栏显示图标
    - frame: 是否显示边框
        + 默认情况下，无边框时，将不可拖动
        + 使窗口拖动
        ```
        body { -webkit-user-select: noen; -webkit-app-region: drag; }
        ```
    - show:
    - kiosk: 是否使用 kiosk 模式。kiosk 模式下，应用程序将会全屏显示，并且组织用户离开应用
* webkit: 用来控制 webkit 一些特性的打开或者关闭
    - plugin: 是否加载插件，默认为 false
    - java: 是否加载 java applets，默认为 fasle
    - page-cache: 是否启用页面缓存，默认为 false
* user-agent: 应用发起 http 请求时，使用的 user-agent 头信息。下列占位符可以被替换
    - %name: 配置中的 name 属性
    - %ver: 配置中的 version 属性
    - %nwver: 被 node-webkit 版本信息替换
    - %webkit_ver: 被 webkit 引擎的版本信息替换
    - %osinfo: 被操作系统和 CPU 信息替换
* chromium-args: 定义 chrominum 启动参数
* js-flags: 传递给 js 引擎(V8) 的参数
* inject-start/inject-end: 指定 JS 文件
    - inject-start: 该文件会在所有 CSS 文件加载完毕， DOM 初始化之前执行
    - inject-end: 该文件会在页面加载完毕，onload 事件触发之前执行
* snapshot: 应用程序的快照文件路径。包含编译的 JS 代码。使用快照文件可以有效保护 JS 代码
* dom_storage_quota: dom 存储的限额。建议设置为预想大小的2倍
* no-edit-menu: edit 菜单是否显示。仅在 Mac 下有效
* description: 描述信息
* version: 
* keywords:
* maintainers:
    - name
    - email
    - web
* contributors:
    - name
    - email
    - web
* bugs:
* licenses:
    - type
    - url
* repositories
    - type
    - url
    - path

## Native UI API
* 生成菜单
```
// 加载 gui 模块
var gui = require('nw.gui');
// 创建 menubar 类型 menu(菜单栏)
var menubar = new gui.Menu({ type: 'menubar' });
// ---
// ---
// 获取窗口对象
var win = gui.Window.get();
// 设置窗口菜单
win.menu = menubar;
```
### API 分类

* EXTENDED WINDOW APIS
    - Window
    - Frameless Window
* MENUS
    - Menu
    - MenuItem
    - Window menu
* PLATFORM SERVICES
    - App: 每一个应用都可以访问的全局函数
    - Clipboard: 剪贴板
    - Tray: 状态显示与通知
    - File dialogs: 文件对话框
    - Shell
    - Handing files and arguments
* TIPS
    - Show window after page is ready
    - Minimize to tray
    - Preserve window state between sessions

### 注意事项
* 不要通过赋值的方式直接修改一个 GUI 对象
> menu.items[0] = item;
* 想要替换一个元素，需要先 remove 再 insert
* 在调用 gui.api 过程中出现的异常，目前 node-webkit 并没有做处理，程序会直接崩溃。要小心重复删除元素之类的操作
* 删除一个对象之后，要将其设置为 null 值
```
> var tray = new gui.Tray();
tray.remove();
tray = null;
```
* 不要改变 UI 类型的原型(Do not change UI types' prototype)
* 在 node-webkit 中，每一个元素都从 node.js 的 EventEmitter 继承而来，所以可以使用 `click` 监听元素
```
menuitem.on('click', function() {
    console.log('Item is clicked...');
});
```

### Window API
* 获取 window
> gui.Window.get()
* 创建 window
> var newWin = gui.Window.get(window.open('https://github.com'))
> var newWin = gui.Window.open('https://github.com', options);

### Frameless Window API
* Frameless Window 是没有操作系统默认样式的边框的窗口，也就意味着最大、最小和关闭按钮访问不到，默认情况下不能被拖曳
* 可以使用在需要自定义标题栏、窗口边框样式和按钮的时候
* 可以通过设置:: `body { -webkit-app-region: drag; }` 来启用拖曳
* 在其他元素去除拖曳: `button { -webkit-app-region: no-drag; }`

### MENU API
* Menu API 提供的是本地化的窗口菜单，即 windows 下常说的工具栏，定义的菜单栏在本地化 window 上，不属于 DOM 文档
* Menu 分为两种，window 菜单(menubar) 和上下文(右键)菜单(context menu)
#### MENU API
#### MENUITEM API

### Platform Service

#### APP
* APP 类别的 API 是针对当前正在运行的应用程序实例的，是进程级别的
* node-webkit 每一个窗口在单独进程中，应用本身是多进程的
```
var gui = require('nw.gui');
var app = gui.App;
```

* 获取 package.json 的配置信息
> app.manifest
* 清除缓存: app.clearCache()
* 关闭程序: app.closeAllWindows()/quit() - (closeAllWindows() 方法会发送窗口的关闭消息，可以监听 close 事件)
* 应用崩溃：node-webkit 提供了 app.crashBrowser() 和 app.crashRenderer()两个 API，分别保存 browser 进程和 render 进程的数据

#### Clipboard
* clipboard 是对操作系统剪贴板的一个抽象，目前只支持获取和设置纯文本内容
```
var gui = require('nw.gui');
var clipboard = gui.Clipboard.get();
```
* 获取剪贴板内容：`clipboard.get('text');`
* 设置剪贴板内容：`clipboard.set(textStr, 'text');`
* 清除剪贴板内容：`clipboard.clear();`

#### Tray(状态图标，消息通知)
* Tray 在不同平台下展现形式不一样，通常以一个 ICON 的形式展现在操作系统通知的位置。在 Mac 下称之为 Status Item,GTK 环境下称为 Status Icon,windows 叫系统托盘
```
var tray = new gui.Tray({
    title: 'Tray Title',
    icon: 'images/icon.png'
});
var menu = new gui.Menu();
// 设置 menu
tray.menu = menu;

tray.on('click', callback);
```
* 现在还没有办法临时隐藏 Tray，只能删除它
```
tray.remove();
tray = null;
```

#### File dialogs

#### Shell(桌面相关)
* openExternal(URI): 用桌面系统默认的行为，在应用外部打开 URI
* openItem(file_path): 以操作系统默认方式打开指定路径
* showItemInFolder(file_path): 在文件管理器中显示 "file_path" 指定的文件

#### Handing files and arguments

#### 全屏
* Window.enterFullscreen()
* Window.leaveFullscreen()
* Window.toggleFullscreen()