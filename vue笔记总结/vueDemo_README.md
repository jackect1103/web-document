[TOC]

## 1. vue脚手架
```javascript
用来创建vue项目的工具包
创建项目:
    npm install -g vue-cli
    vue init webpack VueDemo
开发环境运行:
    cd VueDemo
    npm install
    npm run dev
生产环境打包发布
    npm run build
    npm install -g serve
    serve dist
    http://localhost:5000
```

## 2. eslint
    用来做项目编码规范检查的工具
    基本原理: 定义了很多规则, 检查项目的代码一旦发现违背了某个规则就输出相应的提示信息
    有相应的配置, 可定制检查

## 3. 组件化编程
```javascript
vue文件包含3个部分
    <template>
      <div>
      </div>
    </template>
    <script>
        export default {
		  props: []/{}
          data(){},
          //1.监听被改变的数据（通过别的数据来改变的数据）
          //2.具有缓存功能
		  computed: {}
          methods: {},
		  
		  watch: {}//监听需要改变的数据
		  filters: {}//过滤
		  directives: {}//自己定义的指令
		  components: {}
        }
    </script>
    <style>
    </style>
组件化编码的基本流程
	1). 拆分界面, 抽取组件
	2). 编写静态组件
	3). 编写动态组件
    	初始化数据, 动态显示初始化界面
    	实现与用户交互功能
组件通信的5种方式
	props
	vue的自定义事件 $emit()
	pubsub第三方库
	slot
	vuex(后面单独讲)
props:
    父子组件间通信的基本方式
    属性值的2大类型: 
        一般: 父组件-->子组件
        函数: 子组件-->父组件//通过$emit来触发父组件的事件，同时将自身的参数传给父组件
	隔层组件间传递: 必须逐层传递(麻烦)
	兄弟组件间: 必须借助父组件(麻烦)
vue自定义事件
    子组件与父组件的通信方式
    用来取代function props
    不适合隔层组件和兄弟组件间的通信
pubsub第三方库(消息订阅与发布)
    适合于任何关系的组件间通信
slot(作用域插槽：主要是用于父组件获取子组件的数据) 
    通信是带数据的标签
    注意: 标签是在父组件中解析
vuex
    多组件共享状态(数据的管理)
    组件间的关系也没有限制
    功能比pubsub强大, 更适用于vue项目
```

## 4. ajax
```javascript
相关库:
    vue-resource: vue插件, 多用于vue1.x
    axios: 第三方库, 多用于vue2.x
vue-resource使用
    // 引入模块
    import VueResource from 'vue-resource'
    // 使用插件
    Vue.use(VueResource)
    
    // 通过vue/组件对象发送ajax请求
    this.$http.get('/someUrl').then((response) => {
      // success callback
      console.log(response.data) //返回结果数据
    }, (response) => {
      // error callback
      console.log(response.statusText) //错误信息
    })
axios使用
    // 引入模块
    import axios from 'axios'
    
    // 发送ajax请求
    axios.get(url)
      .then(response => {
        console.log(response.data) // 得到返回结果数据
      })
      .catch(error => {
    	console.log(error.message)
      })
```

## 5. vue-router

###  5.1 vue-router用来实现SPA的插件

```javascript
使用vue-router
    1. 创建路由器: router/index.js
      new VueRouter({
        routes: [
          { // 一般路由
            path: '/about',
            component: about
          },
          { // 自动跳转路由
            path: '/', 
            redirect: '/about'
          }
        ]
      })
    2. 注册路由器: main.js
       import router from './router'
       	new Vue({
       		router
       	})
    3. 使用路由组件标签:
       	<router-link to="/xxx">Go to XXX</router-link>
       	<router-view></router-view>
编写路由的3步
    1. 定义路由组件    
    2. 映射路由
    3. 编写路由2个标签
```
### 5.2 嵌套路由(类似tab选项框的时候，切换tab键**/user/foo/profile  ||  /user/foo/posts**)

```js
children: [
        {
          path: '/home/news',
          component: news
        },
        {
          path: 'message',
          component: message
        }
    ]
```

### 5.3 向路由组件传递数据

```html
params: <router-link to="/home/news/abc/123">
props: <router-view msg='abc'>
```

### 5.4路由的编程式导航

```js
this.$router.push(path): 相当于点击路由链接(可以返回到当前路由界面)
this.$router.replace(path): 用新路由替换当前路由(不可以返回到当前路由界面)
this.$router.back(): 请求(返回)上一个记录路由
```

### 5.5缓存路由组件

```html
<keep-alive>的作用：https://www.jianshu.com/p/4b55d312d297
其中的缺点：
  我们使用动态路由做匹配的话页面只会保持第一次请求数据的渲染结果
    
解决方法：
  利用include（只有包含的才会被缓存）、
    <keep-alive include="bookLists,bookLists"> //boklists是组件的name名称
        <router-view></router-view>
    </keep-alive>
  exclude（包含的不会被缓存）属性
    <keep-alive exclude="indexLists">
        <router-view></router-view>
    </keep-alive>
```



### 5.6路由属性

- 1.replace
设置replace属性的话，当点击时，会调用roter.replace()而不是router.push()，所以导航后**不会留下history记录**，也就是**不能回退到上一个页面**
```html
 <router-link :to="{path: ‘/abc‘}" replace>ABC</router-link>
```
- 2.tag
有时候想要<router-link>渲染成某种标签，例如<li>。于是我们使用tag prop 类指定何种标签，同样它还是会监听点击，触发导航。
```html
 <router-link to="/foo" tag="li">FOO</router-link>
  // 渲染结果 
  <li>FOO</li>
```

### 5.7参数传递
vue-router传递参数分为两大类
- 编程式的导航 router.push()
- 声明式的导航 <router-link>
  
#### 5.7.1编程式导航传递参数有两种类型：字符串、对象。
```javascript
1. 字符串的方式是直接将路由地址以字符串的方式来跳转，这种方式很简单但是不能传递参数：
   this.$router.push("home");
2. 想要传递参数主要就是以**对象**的方式来写，分为两种方式：命名路由、查询参数
 ***和name配对的是params，和path配对的是query***

* 命名路由(命名路由这种方式传递的参数，如果在目标页面刷新是会出错的)
  在路由上设置name属性
  var router = new Router({
    routers:[
      {
        path:'/news',
        name:'news',
        component:'News'
      }
    ]
  })
  使用方法：
  this.$router.push({ name: 'news', params: { userId: 123 }})
* 查询参数使用方法：
  this.$router.push({ path: '/news', query: { userId: 123 }});
```

#### 5.7.2声明式的导航
```html
- 字符串
<router-link to="news">click to news page</router-link>

- 命名路由（使用的是name属性，params）类似于post方法
<router-link :to="{ name: 'news', params: { userId: 1111}}">click to news page</router-link>

- 查询参数（使用的是path属性，query）类似于get方法
<router-link :to="{ path: '/news', query: { userId: 1111}}">click to news page</router-link>

```
####  5.7.3使用 Vue Router 路由器的步骤是什么并给出一个例子？

- 第一种：是全局导航钩子：router.beforeEach(to,from,next)，作用：跳转前进行判断拦截。
  第二种：组件内的钩子
  第三种：单独路由独享组件

- 组件1跳转到组件2，然后组件2跳转组件2本身

  ```js
  router.beforeEach(全局前置守卫) => beforeEnter(路由独享守卫) => beforeRouterEnter(组件内的进入守卫) => router.beforeResolve(全局解析守卫) => router.afterEach(全局后置守卫) => 组件2 onComplete回调 => 组件2 beforeCreate(组件生命周期) => created => router.beforeEach(全局前置守卫) => 组件2 beforeRouterUpdate()
  ```

- 如果从组件1 跳转到组件2 的生命周期顺序

```js
会先执行组件1的销毁函数，在执行组件2的mounted
组件2beforeCreate => 组件2created => 组件2 beforeMounte => 组件1 beforeDestory => 组件1 destoryed => 组件2 mounted
```

### 5.8路由切换的滚动行为
 - 注意：这个功能只在支持 history.pushState 的浏览器中可用。

```javascript
  // 一般滚动
scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
        // 在浏览器按下 后退/前进按钮时
        return savedPosition
    } else {
        return { x: 0, y: 0 }
    }
}

// 锚点滚动
scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
        return {
            selector: to.hash
        }
    }
}

// 异步滚动  2.8.0 新增
scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ x: 0, y: 0 })
        }, 500)
    })
}  

```
## 6.Vue-router 跳转和 location.href 有什么区别？
window.location对象 和 window.history对象
eg：https://segmentfault.com/a/1190000014120456
```javascript
1、使用location.href='/url'来跳转，简单方便，但是刷新了页面。
window.location对象
       location.href()不会刷新页面
       location.hash()不会刷新页面
       location.search()会刷新页面
       location.pathname()会刷新页面

2、使用history.pushState('/url')，无刷新页面，静态跳转。
window.history对象下的方法均不会刷新页面
      history.pushState()
      history.replaceState()
      history.go()
      history.back()
      history.forward()

3、引进router，然后使用router.push('/url')来跳转，使用了diff算法，实现了按需加载，减少了dom的消耗。

其实使用router跳转和使用history.pushState()没什么差别的，因为vue-router就是用了history.pushState()，尤其是在history模式下。

```
