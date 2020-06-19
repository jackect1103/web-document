# 1. Vue.js是什么?
```javascript
1). 一位华裔前Google工程师(尤雨溪)开发的前端js库
2). 作用: 动态构建用户界面
3). 特点:
	* 遵循MVVM模式
	* 编码简洁, 体积小, 运行效率高, 移动/PC端开发
	* 它本身只关注UI, 可以轻松引入vue插件和其它第三库开发项目
4). 与其它框架的关联:
	* 借鉴angular的模板和数据绑定技术
	* 借鉴react的组件化和虚拟DOM技术
5). vue包含一系列的扩展插件(库):
	* vue-cli: vue脚手架
	* vue-resource(axios): ajax请求
	* vue-router: 路由
	* vuex: 状态管理
	* vue-lazyload: 图片懒加载
	* vue-scroller: 页面滑动相关
	* mint-ui: 基于vue的组件库(移动端)
	* element-ui: 基于vue的组件库(PC端)
```

# 2. 基本使用
```javascript
1). 引入vue.js
2). 创建Vue实例对象(vm), 指定选项(配置)对象
	el : 指定dom标签容器的选择器
	data : 指定初始化状态数据的对象/函数(返回一个对象)
3). 在页面模板中使用{{}}或vue指令
```

# 3. Vue对象的选项
## 1). el
```javascript
指定dom标签容器的选择器
Vue就会管理对应的标签及其子标签
```

## 2). data
```javascript
对象或函数类型
指定初始化状态属性数据的对象
vm也会自动拥有data中所有属性
页面中可以直接访问使用
数据代理: 由vm对象来代理对data中所有属性的操作(读/写)
```
## 3). methods
```javascript
包含多个方法的对象
供页面中的事件指令来绑定回调
回调函数默认**有event参数**, 但也可以指定自己的参数
所有的方法由vue对象来调用, 访问data中的属性直接使用this.xxx
```

## 4). computed
```javascript
包含多个方法的对象
对状态属性进行计算返回一个新的数据, 供页面获取显示
一般情况下是相当于是一个只读的属性
利用set/get方法来实现属性数据的计算读取, 同时监视属性数据的变化
如何给对象定义get/set属性
	在创建对象时指定: get name () {return xxx} / set name (value) {}
  	对象创建之后指定: Object.defineProperty(obj, age, {get(){}, set(value){}})
```

## 5). watch
```javascript
包含多个属性监视的对象
分为一般监视和深度监视
    xxx: function(value){}
	xxx : {
		deep : true,
		handler : fun(value)
	}
//全局监听
另一种添加监视方式: vm.$watch('xxx', function(value){})
```

# 4. 过渡动画
```javascript
利用vue去操控css的transition/animation动画
模板: 使用<transition name='xxx'>包含带动画的标签
css样式
	.fade-enter-active: 进入过程, 指定进入的transition
	.fade-leave-active: 离开过程, 指定离开的transition
	.xxx-enter, .xxx-leave-to: 指定隐藏的样式
编码例子
    .xxx-enter-active, .xxx-leave-active {
      transition: opacity .5s
    }
    .xxx-enter, .xxx-leave-to {
      opacity: 0
    }
    
    <transition name="xxx">
      <p v-if="show">hello</p>
    </transition>
```

# 5. 生命周期
```javascript
vm/组件对象
生命周期图
主要的生命周期函数(钩子)
	created() / mounted(): 启动异步任务(启动定时器,发送ajax请求, 绑定监听)
	beforeDestroy(): 做一些收尾的工作
```

# 6. 自定义过滤器
## 1). 理解
	对需要显示的**数据进行格式化**后再显示

## 2). 编码
```javascript
1). 定义过滤器
	Vue.filter(filterName, function(value[,arg1,arg2,...]){
	  // 进行一定的数据处理
	  return newValue
	})
2). 使用过滤器
	<div>{{myData | filterName}}</div>
	<div>{{myData | filterName(arg)}}</div>
```

# 7. vue内置指令
```javascript
v-text/v-html: 指定标签体
	* v-text : 当作纯文本
	* v-html : 将value作为html标签来解析
v-if v-else v-show: 显示/隐藏元素
	* v-if : 如果vlaue为true, 当前标签会输出在页面中
	* v-else : 与v-if一起使用, 如果value为false, 将当前标签输出到页面中
	* v-show: 就会在标签中添加display样式, 如果vlaue为true, display=block, 否则是none
v-for : 遍历
	* 遍历数组 : v-for="(person, index) in persons"   
	* 遍历对象 : v-for="value in person"   $key
v-on : 绑定事件监听
	* v-on:事件名, 可以缩写为: @事件名
	* 监视具体的按键: @keyup.keyCode   @keyup.enter
	* 停止事件的冒泡和阻止事件默认行为: @click.stop   @click.prevent
	* 隐含对象: $event
v-bind : 强制绑定解析表达式  
	* html标签属性是不支持表达式的, 就可以使用v-bind
	* 可以缩写为:  :id='name'
	* :class
	  * :class="a"
		* :class="{classA : isA, classB : isB}"
		* :class="[classA, classB]"
	* :style
		:style="{color : color}"
v-model
	* 双向数据绑定
	* 自动收集用户输入数据
ref : 标识某个标签
	* ref='xxx'
	* 读取得到标签对象: this.$refs.xxx
```

# 8. 自定义指令
## 1). 注册全局指令
```javascript
Vue.directive('my-directive', function(el, binding){
  el.innerHTML = binding.value.toUpperCase()
})
```

## 2). 注册局部指令
```javascript
directives : {
  'my-directive' : function(el, binding) {
      el.innerHTML = binding.value.toUpperCase()
  }
}
```

## 3). 使用指令
```javascript
<div v-my-directive='xxx'>
```

# 9. nextTck

## 9.1nextTick的触发时机

　　　　  说明：$nextTick 是在下次DOM更新循环结束之后延迟回调，在修改数据之后使用$nextTick,则可以再回调中获取更新后的DOM

​				在同一事件循环中的数据变化后，**DOM完成更新，立即执行nextTick(callback)内的回调**。（涉及到事件循环机制）

```html
<template>
  <div>
    <div ref="msgDiv">{{msg}}</div>
    <div v-if="msg1">Message got outside $nextTick: {{msg1}}</div>
    <div v-if="msg2">Message got inside $nextTick: {{msg2}}</div>
    <div v-if="msg3">Message got outside $nextTick: {{msg3}}</div>
    <button @click="changeMsg">Change the Message</button>
  </div>
</template>
```

```js
data() {
    return {
      msg: "Hello Vue.",
      msg1: "",
      msg2: "",
      msg3: ""
    };
  },
  methods: {
    changeMsg() {
      this.msg = "Hello world.";
      this.msg1 = this.$refs.msgDiv.innerHTML;
      this.$nextTick(() => {
        this.msg2 = this.$refs.msgDiv.innerHTML;
      });
      this.msg3 = this.$refs.msgDiv.innerHTML;
    }
  }
```

> 点击前

![点击前](https://upload-images.jianshu.io/upload_images/3985563-b6bb266285e8d232.png?imageMogr2/auto-orient/strip|imageView2/2/w/152/format/webp)

> 点击后

![点击后](https://upload-images.jianshu.io/upload_images/3985563-f49bff3190724514.png?imageMogr2/auto-orient/strip|imageView2/2/w/341/format/webp)

## 9.2应用场景

- 在Vue生命周期的`created()`钩子函数**进行的DOM操作**一定要放在`Vue.nextTick()`的回调函数中

  在`created()`钩子函数执行的时候，DOM 其实并未进行任何渲染，而此时进行DOM操作无异于徒劳，所以此处一定要将DOM操作的js代码放进`Vue.nextTick(（）=>{})`的回调函数中。**与之对应**的就是**`mounted()`钩子函数**，因为该钩子函数执行时**所有的DOM挂载和渲染都已完成**，此时在该钩子函数中进行任何DOM操作都不会有问题 。

- 在数据变化后要执行的某个操作，而这个操作需要使用随数据改变而改变的DOM结构的时候，这个操作都应该放进`Vue.nextTick()`的回调函数中。

  例如swiper轮播图的时候，需要先将图片请求到后，将数据赋值给data中的**swiperList**属性用于渲染。但是new Swiper('.swiper-container'),需要写在**Vue.nextTick(（）=>{})**中。

  ```js
  mounted(){
      this.$axios.get('http://xxxx.com')
      .then(res=>{
          this.swiperList = res.data.swiperList
      })
  },
  watch:{
      swiperList(){
          this.$nextTick(()=>{
              //是指轮播图的图片请求到后在将数据渲染到dom中  
              new Swiper('.swiper-container')
          })
      }
  }
  ```

  

  