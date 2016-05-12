交接功能列表
==========

## :white_check_mark: 一 响应式表格(conow-grid)
### 功能说明
* 提供表格式的数据展示与操作

### 功能列表
* 数据加载（接口数据/JSON 数据）
* 过滤（数据筛选）
* 排序（前台/后台）
* 分页（前台、后台）
* 选择（单选/多选，并可动态切换；对应行是否可选；选择样式；选择行触发事件；全选触发事件）
* 行样式（根据数据决定）
* 列定义（columnDefs）
* 提供一些实例方法：reload,getSelectedItems,getPageItems,getDataloadParams

### 参数列表
* url
* urlParams
* json
* isPagination
* isServerPage
* columnDefs
* quickSearchKey
* quickSearchTip
* filterOptions
* selectMode
* selectedItems(初始化时已选项)
* isRowSelectable
* rowSelectFn
* rowClassFn
* pageSize
* rowHeaderSelectFn
* allSelectFn
* appData
* virtualizationThreshold
* selectModeChange
* columnDefs
    - name/displayName
    - field
    - width/minWidth
    - enableSorting
    - cellToolTip
    - type
    - cellType
    - cellTemplate
    - cellFilter
    - cellClass
    - headerCellClass
    - pinnedLeft
    - pinnedRight

### 方法
* conowGridInstance.reload()
* conowGridInstance.getSelectedItems()

### 指令目录
* `'main/webapp/js/directives/conow-grid'`

### 补充说明
* conow-grid 是基于第三方组件 ui-grid 开发，基础功能可参考 [ui-grid](http://ui-grid.info/),源代码脚本和样式文件都有做修改，并做了压缩处理，见对应目录下的 `*.full.js` `*.js` 和 `*.full.css` `*.css`
* 上一版本的表格指令参考了 [ng-table](http://ng-table.com/)

### 关于新版本的说明（建议参考 ng-table 和 [datatables](https://www.datatables.net/)）
* 指令结构
```
<conow-grid>
    <conow-grid-header></conow-grid-header>
    <conow-grid-body></conow-grid-body>
    <conow-grid-footer></conow-grid-footer>
</conow-grid>
```
* 数据加载分前、后端（isFullLoaded)
* 分页、排序、过滤
* 选择（单选、多选、默认选中、回调方法）
* 自定义模板（header、body、footer）
* resize列（resizable）
* draggable：拖动效果
* 展开/折叠（collapse）
* 响应式隐藏（hidden）
* 固定行（fixed header）/固定列
* 编辑
* 分组

## :white_check_mark:   二 数字步增(conow-stepper) 

### 功能说明
* 指令是对数字的增/减进行的操作
* 指定操作的范围(最小和最大)
* 指定步长
* 指定单位名称
* 自定义增/减的图标
* 可设置风格快速指定样式

### 参数列表
* ng-model:业务绑定的数据
* decimals:显示的数字精度
* step:步长
* min:最小值
* max:最大值
* unit-name:单位名称
* icon-prev:递减图标
* icon-next:递增图标
* theme:指定风格(暂时只支持 page)

### 指令目录
* `'js/directives/conow-stepper'`

## :white_check_mark: 三 字母分组选择(conow-alphabet-group-sel)
### 功能说明
* 对后台返回的数据进行拼音转换，按照首字母分组
* 适用于国家选择(已和城市选择整合)、城市选择(已废弃)、院校选择
* 数据可以初始化时全部加载，也可以点击对应的字母分别加载

### 参数列表（对象参数）
* dataSrcUrl：数据初始化接口
* getSelectedValueUrl：获取已选数据转换接口
* getDataInitialsUrl：点击字母时获取对应的数据接口(数据部分加载时使用)
* searchUrl：搜索对应的接口
* isShowSearch：是否显示搜索功能
* isLoadingAll：是否一次加载所有数据
* isHasCommon：是否显示"常用"分组
* isCommonExpanded："常用"是否默认展开
* isShowAllLabels：是否展示所有的分组标签
* isMultiSelect：是否多选
* selectKey：数据库需要保存的字段名
* selectValue：页面需要显示的字段名
* selectTitle：鼠标hover时显示的字段名
* colsPerRow：每行显示的数据条数
* titleName：弹出层显示名称

### 指令目录
* `'js/directives/conow-alphabet-group/js/conow-alphabet-group-sel.js'`

### 补充说明
* 此指令实现的国家选择已和城市选择整合
* 此指令实现的城市选择已废弃

## :white_check_mark:   四 分页 - conow-pagination
### 功能说明
* 根据数据条数和每页条数生成分页信息
* 可动态修改数据总数
* 提供切换页码的回调方法
* 可动态设置需要显示的当前页码
* 采用 **对象参数** 的配置方式
* 当实际页数大于1时，才显示分页功能（业务要求）

### 参数列表
* totalItems:需要显示的数据总条数
* pageSize:每页显示的数据条数
* onChangeFn:切换分页时的触发方法
* currentPage:设置当前选中页码

### 指令目录
`/conow-pub/src/main/webapp/js/directives/conow-pagination`

### 补充说明
* 指令中引用了 bootstrap 的分页功能，并有修改其实现代码。具体位置为
文件：`/conow-pub/src/main/webapp/vendor/modules/angular-bootstrap/ui-bootstrap-tpls.js`
方法：`getPages()`

## :white_check_mark:   五 地区选择 - conow-area2
### 功能说明
* 提供地区的选择、地区编码显示时的转换功能
* 选择市一级数据
* 根据市的编码进行转换
* 选择省市区数据
* 根据区的编码进行转换
* 选择市与国家数据
* 根据国家的编码进行转换
* 筛选指令中可配置 `emit-advsearch` 触发地区选择的事件广播
* 地区维护页面的选择功能(维护功能入口：系统管理 -> 参数管理 -> 地区信息配置。因为上级数据有 `中国`，跟普通的选择的数据源不一样，可联系何綮超进行维护)
* 所有的接口数据都由何綮超提供

### 参数列表
* conow-area2:初始化指令属性
* select-type:默认为选择市，为2时为级联选择省市区
* ng-model:绑定的数据
* callback-fn:选择数据以后的回调方法
* overseas:选择市和国家

### 指令目录
`/conow-pub/src/main/webapp/js/directives/conow-area`

### 实现方式说明
* 指令实现位于 `conow-area.js` 文件
* 所有的数据获取，数据操作，提供的方法(包括过滤器用到的方法)都位于 `area-services.js` 中(利用了 $q 的 promise 方法)
* 过滤器位于 `area-filters.js` 中(数据转换的过滤器是 $statful )

## :white_check_mark:   六 二维码 
### 功能说明
* 普通字符串转换二维码图片
* 人员名片生成二维码图片

### 参数列表
* text:需要转换的文本(加入手机通讯录的功能可以通过 `vcardFormat` 过滤器转换人员信息)
* image-logo:二维码图片中间的插入图片地址

### 指令目录
`/conow-pub/src/main/webapp/js/directives/conow-qrcode`

### 补充说明
功能实现还引入了 js 生成二维码的功能代码，位于 `'vendor/modules/angular-qr/qrcode-in-native-js.js'`

## :white_check_mark:   七 操作提示 - conow-operation-service
### 功能说明
* 统一业务操作方式和行为
* interAction(包含后台接口操作)
* alertAction(不包含接口操作，只用作提示信息)

### 参数列表
* interAction
    - isShowConfirm:
    - confirmTitle:
    - confirmText:
    - isShowSuccess:
    - successTitle:
    - successText:
    - errorTitle:
    - errorText:
    - actionUrl:
    - data:
    - isSuccessBack:
    - redirectState:
    - redirectParams:
    - successFunc:
    - errorFunc:
    - confirmBtnText:
    - cancelBtnText:
    - confirmFunc:
    - confirmFuncParams:
    - cancelFunc:
    - cancelFuncParams:
* alertAction
    - alertMsg:
    - confirmText:
    - alertType:
    - showCancelBtn:
    - confirmFunc:
    - confirmFuncParams:
    - cancelFunc:
    - cancelFuncParams:
    - confirmButtonText:
    - cancelButtonText:
### 指令目录

### 补充说明
功能实现还引入了第三方插件 SweetAlert.js，并修改了源代码，位于 `/conow-pub/src/main/webapp/vendor/plugins/jquery/sweet-alert`

## :white_check_mark: 八 拼音转换（过滤器）
### 功能说明
* 提供中文转换拼音的方法：chinese2Pinyin.getPinyin()
* 获取中文首字母的过滤器：getGroupLabel
* 提供按照给定code分组的过滤器：groupBy

### 参数列表
* `$filter('groupBy')($filter('getGroupLabel')(data,'FROM_USER_ID_HR_STAFF_INFO'), 'groupLabel');`

### 文件目录
* `'js/filters/pinyin-convert.js'`

## :white_check_mark: 九 通讯录 - contactlist（业务功能）
### 功能说明
* 提供组织内通讯录的功能
* 人员/组织搜索
* 我的单位
* 我的组织
* 兼任组织
* 关注的组织
* 关注的人员
* 我的群组
* 最近联系人

### 参数列表
* 无

### 文件目录
* `'webapp/app/business/home/contactlist'`

### 补充说明
* 所有的功能后台接口都由一组提供，可联系 @胡一峰
* 建议此功能交给一组统一维护
* 通讯录首页可以在指定范围搜索组织/人员/群组(胡一峰添加)
* 组织机构可以实现逐级获取
* "关注的组织和人员"由`followedService` 提供，文件位于 `'app/business/home/contactlist/js/contactlist-common.js'` 每次更新数据时需要同步更新服务，页面也会相应的watch服务的数据，进行同步更新(关注或者取消关注时，各个页面的数据是同步的)
* "我的群组"的功能,需要用到业务组创建、删除群的功能产生的数据，可联系 @区文辉 进行处理
* 组织信息页面用到了面包屑、iscroll组件
* 人员信息页面用到了二维码生成组件

## :white_check_mark: 十 工程化 - grunt
### 功能说明
* 提供项目开发、测试、部署、发布的自动化工具
* 组件开发目录自动生成
* js 压缩、合并
* less 编译、css 压缩、合并
* 根据配置生成不同环境的 index 页面
* watch 文件修改自动编译、合并
* 自动化测试
* 代码质量检查

### 用到的插件
* grunt-contrib-uglify
* grunt-contrib-copy
* grunt-contrib-concat
* grunt-contrib-clean
* grunt-contrib-less
* grunt-contrib-cssmin
* grunt-contrib-jshint
* grunt-contrib-watch
* load-grunt-tasks
* uncss(去除页面没有用到的css)

### 配置文件
* `'main/webapp/UEDV2/Gruntfile.js'`：grunt task 文件
* `'main/webapp/UEDV2/build.config.js'`:grunt 配置文件

## :white_check_mark: 十一 自定义表格
### 功能说明
* 包含筛选、分页功能的表格模板
* 可以实现获取筛选参数等 conow-grid 没有实现的功能
* 使用 .table .conow-grid 类名控制 table 的基本样式与 conow-grid 指令生成的表格类似

### 参数列表
* 无

### 文件目录
* 无

### 补充说明
* 此功能只是对现有功能的组合，使用需参考 筛选和分页组件的参数配置
* 使用的 controller 中需要对数据进行处理，也要提供筛选和分页的触发方法

## :white_check_mark: 十二 表单校验
### 功能说明
* 提供表单保存、提交时的验证
* 功能包括：必填、邮箱、唯一性、密码、重复校验、数字、url、最大值/最小值、精度、强弱校验、自定义校验

### 参数列表
#### form
* name:提供表单名称，指令里面需要用name来获取元素，以遍历校验
* conow-form-validate:提供校验的配置
* novalidate:去除HTML5本身的校验

#### label
* name:
* required:
* max
* min
* numeric
* conow-unique-check
* conow-repeat

### 文件目录
* `'js/directives/conow-validator.js'`

### 补充说明
* 基于第三方组件[angular-w5c-validator](https://github.com/why520crazy/angular-w5c-validator)修改