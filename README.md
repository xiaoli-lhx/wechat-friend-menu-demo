# 友情菜单机

一个基于原生微信小程序 + 微信云开发做出来的朋友互动菜单 Demo。

这不是商用点餐系统，也不接真实支付，定位就是：

- 给朋友演示
- 给作品集展示
- 给自己验证“只靠提示词 + Codex 能不能从零搭一套小程序 MVP”

当前仓库已经完成了一个可运行的体验版。

## 项目当前最终状态

这版项目目前包含：

- 原生微信小程序，不使用 Taro、uni-app、mpvue
- 微信云开发
- 云数据库集合：
  - `menu_categories`
  - `menu_items`
  - `orders`
- 云函数：
  - `createOrder`
  - `updateOrderStatus`
  - `seedMenuData`
- 菜单页：
  - 店铺头像、店名、公告
  - 分类切换
  - 商品卡片
  - 加购物车
  - 随机选一个
  - 购物车弹层
  - 清空购物车
  - 商品数量统一管理
  - 饮品规格先选后加购
- 订单页：
  - 查看订单
  - 下拉刷新
  - 标记完成
- 我的页面：
  - 自定义昵称
  - 累计订单数
  - 趣味文案
- 数据联动：
  - 下单写入 `orders`
  - 订单状态可更新
  - `monthlySales` 会随下单增长

这版更适合作为体验版或作品展示，不建议直接按当前状态商用上线。

## 技术栈

- 微信原生小程序
- 微信云开发
- 云数据库
- 云函数
- 原生 WXML / WXSS / JS

## 目录结构

```text
wechat_js
├─ cloudfunctions
│  ├─ createOrder
│  ├─ seedMenuData
│  └─ updateOrderStatus
├─ database
│  └─ seed
│     ├─ menu_categories.json
│     └─ menu_items.json
├─ miniprogram
│  ├─ config
│  │  └─ index.js
│  ├─ mockData
│  │  └─ menu.js
│  ├─ pages
│  │  ├─ menu
│  │  ├─ orders
│  │  └─ profile
│  ├─ services
│  │  ├─ menu.js
│  │  └─ order.js
│  ├─ utils
│  │  ├─ format.js
│  │  ├─ image.js
│  │  └─ user.js
│  ├─ app.js
│  ├─ app.json
│  ├─ app.wxss
│  └─ sitemap.json
├─ project.config.json
└─ README.md
```

## 如何运行

### 1. 导入微信开发者工具

1. 打开微信开发者工具
2. 导入项目目录
3. 使用你自己的小程序 `AppID`

### 2. 配置云环境

打开：

[miniprogram/config/index.js](D:/download/wechat_js/miniprogram/config/index.js)

填入你的云环境 ID：

```js
const cloudConfig = {
  envId: '你的云环境ID',
  useCloudMenu: true,
  useCloudOrder: true
};
```

### 3. 创建集合

在云开发控制台创建：

- `menu_categories`
- `menu_items`
- `orders`

### 4. 部署云函数

把下面 3 个云函数都上传部署：

- [cloudfunctions/createOrder](D:/download/wechat_js/cloudfunctions/createOrder)
- [cloudfunctions/updateOrderStatus](D:/download/wechat_js/cloudfunctions/updateOrderStatus)
- [cloudfunctions/seedMenuData](D:/download/wechat_js/cloudfunctions/seedMenuData)

### 5. 初始化菜单数据

调用一次 `seedMenuData`。

它会自动写入：

- 菜单分类
- 菜单商品
- 默认图片
- 默认 `monthlySales: 0`

## 当前交互说明

### 菜单页

- 普通商品点击 `+` 直接加入购物车
- 饮品点击 `+` 会先弹出规格选择面板
- 当前规格选完后加入购物车
- 同一个商品不同规格会作为不同购物车项存在

### 购物车

- 支持展开弹层
- 支持加减数量
- 支持清空
- 购物车内只展示：
  - 商品名
  - 标签
  - 简介
  - 当前规格摘要
  - 数量
  - 价格

### 订单

- 提交订单后写入云数据库
- 支持查看订单列表
- 支持标记订单完成

## 关于月销量

当前仓库里的种子数据已经统一改成：

```text
monthlySales = 0
```

这是更适合体验版和新项目初始状态的做法。

后续每次下单，`monthlySales` 会自动递增。

如果你已经往云数据库里写过旧数据，需要：

1. 重新部署 `seedMenuData`
2. 再执行一次 `seedMenuData`

这样云端菜单数据也会回到最新版本。

## 这个项目是怎么用 Codex 做出来的

这个仓库最适合放在 GitHub 上展示的点，不是“它有多复杂”，而是：

**只靠明确的提示词，就能让 Codex 从零搭一个完整的小程序 MVP。**

下面是一套比较接近这次实际产出的提示词结构。

## Codex 提示词写法

想让 Codex 产出这种项目，提示词最好包含这 6 类信息：

### 1. 产品定位

要明确这是个什么，不是什么。

示例：

```text
做一个“朋友之间玩的互动电子菜单”微信小程序，不是商用餐饮系统，不接真实支付，不做商家后台。
```

### 2. 技术边界

要直接限制框架和技术方案。

示例：

```text
必须使用原生微信小程序，不要用 Taro、uni-app、mpvue。
必须使用微信云开发。
菜单和订单使用云数据库。
创建订单使用云函数。
```

### 3. 功能范围

要列清楚页面和动作。

示例：

```text
至少要有菜单页、订单页、我的页。
菜单页支持分类切换、加入购物车、随机选一个、提交订单。
订单页支持查看订单和标记完成。
我的页支持显示昵称、累计订单数，并允许自定义昵称。
```

### 4. 风格要求

不要只说“可爱”，要补风格方向。

示例：

```text
整体风格可爱、轻社交、偏二次元电子菜单。
不要做得像严肃商用后台。
文案要有情绪和场景感，不要全是同一种卖萌语气。
```

### 5. 数据结构

这一点很重要，决定生成结果是不是可落地。

示例：

```text
请设计 menu_categories、menu_items、orders 三个集合。
menu_items 至少包含 categoryId、name、desc、price、image、monthlySales、active。
orders 至少包含 userId、userName、items、totalPrice、remark、status、createdAt。
```

### 6. 输出方式

如果你不限定，模型很容易只讲思路不落代码。

示例：

```text
直接输出完整项目代码和目录结构。
每个文件按路径分块输出。
不要只讲思路，直接给可运行代码。
```

## 一份可直接复用的提示词模板

下面这份提示词可以直接拿去给 Codex 用，再按你的题材改。

```text
请帮我从零搭建一个“原生微信小程序 + 微信云开发”的项目。

项目定位：
- 这是一个朋友之间玩的互动型小程序，不是商用系统
- 不接真实支付
- 不做商家后台

技术要求：
- 必须使用原生微信小程序
- 必须使用微信云开发
- 使用云数据库保存核心数据
- 使用云函数处理关键写入逻辑
- 代码结构清晰，适合直接导入微信开发者工具
- 不要引入太重的第三方库

页面要求：
- 至少包含菜单页、订单页、我的页
- 菜单页要支持分类切换、商品展示、加入购物车、提交订单
- 订单页要支持查看订单列表和更新状态
- 我的页要支持昵称展示与自定义修改

数据要求：
- 请设计 menu_categories、menu_items、orders 三个集合
- menu_items 要支持图片、价格、月销量、上下架
- 如果商品是饮品，请支持糖度和冰度规格

界面要求：
- 风格轻松、可爱、偏二次元电子菜单
- 不要做成商家后台风格
- 商品文案不要全是同一种卖萌语气，要更像不同风格的菜单文案

实现要求：
- 先用本地 mock 数据渲染，同时保留切换到云数据库读取的能力
- 需要给出云开发初始化代码
- 需要给出创建订单云函数
- 需要给出初始化菜单数据的方法

输出方式：
- 直接输出完整项目代码和目录结构
- 每个文件都标明路径
- 不要只讲思路，直接给可运行代码
```

## 如果想让 Codex 做得更好

建议在提示词里继续补这些要求：

- “先做 MVP，不要一次加太多后台系统”
- “文案不要太模板化”
- “图片没有现成资源时，先用稳定的本地 SVG 占位方案”
- “购物车和规格选择要符合正常点单习惯”
- “README 要写清楚如何导入、部署、初始化数据”

## 如果以后还要继续迭代

这个项目下一步最适合继续扩展的方向有：

- 更精致的菜单视觉收尾
- 购物车动画和交互细化
- 使用 `OPENID` 作为更稳定的用户主标识
- 体验版测试日志
- 更完整的提审文案和发布流程

## 当前项目用途建议

这版仓库更适合：

- 作为作品集展示
- 给朋友扫码体验
- 用来展示“Codex 能否按提示词完成一个完整小程序”

不建议把当前仓库直接当作正式线上商用系统。
