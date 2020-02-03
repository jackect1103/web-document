借鉴网站：https://blog.csdn.net/weixin_43768585/article/details/84864077

## dom元素样式（宽高/偏移量等）
### 一、obj.offsetWidth和obj.offsetHeight （获取元素的整个高度和宽度）|| obj.offsetParent （只读的,获取当前元素的 最近***定位*** 父元素）
 > 作用： 只能获取对象的宽度和高度，不能修改。得出的结果不带px
```javascript
obj.offsetWifth ( 或offsetHeight) = width (或 height) + padding + border(注意：不包括外边距！)

div.style.width 获取的数据来之行内时的宽高（可以通过div.style.width=xxx）来修改div的宽高
div.style.width == > 100px
```

### 二：obj.clientWidth/obj.clientHeight 获取元素的可见宽度/高度 (只读的，，因为获取的不是一个具体的值)
```javascript
    obj.clientWidth( 或 clientHeight) = width(或 height) + padding(注意：不包括border)，
    即：
    offsetWidth = obj.clientWidth + border
    offsetHeight = obj.clientHeight + border
```

### 三：obj.offsetLeft || obj.offsetTop 
> 返回当前元素相对于 ***最近的定位父元素*** 的距离
> jq的obj.offsetLeft()



### 四：scroll

#### obj.scrollWidth || obj.scrollHeight
> 获取当前元素的整个滚动宽度/高度
> 高度 = 可见内容高度 + 要滚动内容的高度

* 注意事项：obj.scrollHeight = obj.scrollTop + obj.clientHeight

#### obj.scrollLeft || obj.scrollTop
> 获取滚动条滚动的距离
> > 浏览器认为滚动条是html的 所以使用`document.documentElement.scrollTop`来获取scrollTop

### 五：原生width和height

#### 标准的盒子模型（w3c）
width = content
> box-sizing:content-box


#### ie怪异盒子模型
width = content + padding + border;
> box-sizing:border-box


### 获取元素属性 ***兼容性***
```javascript
function getStyle(obj,name){
    if(window.getConputedStyle){
        //判断是否为IE8以下浏览器
        return getConputedStyle(obj,null)[name]
    }else{
        //IE8浏览器以下
        return obj.currentStyle[name];
    }
}
```

## dom事件(event)
### 事件(event)兼容性
> 注意事项：在IE8以下浏览器，将事件对象作为window对象的属性保存
> event = event || window.event;
  1. 鼠标位置event.clientX （永远相对于浏览器可视区域的<0,0>）
```javascript
obj.onMouseOver = function(event){
    event = event || window.event;
    var x = event.clientX;
}
```
> 注意：当需要拖拽某个元素的时候，将事件绑定到document上，绑定在某个元素上会导致该元素只会线性运动
```javascript
obj.onmousedown = function(){
    //为document绑定一个移动事件
    document.onmousemove = function(){
        //...
    }
    //为document绑定一个鼠标松开事件
    document.onmouseup = function(){
        document.onmousemove = null;
        //当点击别的地方的时候，取消鼠标松开事件
        document.onmouseup = null;
    }
    //用于防止ctrl+A 同时点击鼠标拖拽
    if(obj.setCapture){
        obj.setCapture()
    }
    //用于防止ctrl+A 同时点击鼠标拖拽 （只能用于chrome和火狐浏览器）
    return false;
}
```

2. 鼠标位置event.pageX（获取鼠标永远相对于当前整个页面的<0,0>位置）
> 但是在IE8浏览器中是不可以使用的(jquery中也是一样的效果)
```javascript
obj.onMouseOver = function(event){
    event = event || window.event;
    var x = event.pageX;
}
```

3. 鼠标滚轮事件obj.onmousewheel()
```javascript

```

### 事件委派（依赖事件冒泡原理）
```html
<ul>
    <li>1</li>
    <li>2</li>
</ul>
```

```javascript
 window.onload = function(){
     var ul = document.getElementsByTagName('ul')[0];
     ul.onclick = function (event) {
             //兼容IE8以下的浏览器
            event = event || windown.event;
            //获取事件触发元素标签name
            if (event.target.nodeName == 'li'.toUpperCase()) {
                console.log(typeof event.target.nodeName); //string
            }else{
                console.log('error:',event.target.nodeName);
                console.log('li'.toUpperCase())
            }
        }
 }
```

### 事件绑定兼容（IE8以下没有事件捕获阶段）
- addEventListener() ==> 中的this指向的是当前绑定的元素
- attachEvent() ==> 中的this指向的是window
  
```javascript
    1.需要先判断this的指向
    2.做兼容性
 function bind(obj,eventStr,callback){
     if(obj.addEventListener){
         obj.addEventListener(eventStr,callback,false);
     }else{
         //兼容IE8以下的浏览器
         obj.attachEvent('on'+ eventStr,function(){
             callback.call(obj);//将this的指向改为obj
         })
     }
 }
```


### 执行上下文 和 作用域
- 执行上下文（n+1个）
   - 是在函数执行的时候创建的，是动态的
   - 执行上下文存在执行栈中

- 作用域（n+1个） =》 变量作用的范围
   - 是在定义函数的时候创建的，是静态的
  ![作用域](作用域链.png)