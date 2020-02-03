# JavaScript Array 对象方法
# 第一天
## Array创建新的数组
###  1. concat() 方法创建一个新的数组
- 方法用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组。
```javascript
var array1 = ['a', 'b', 'c'];
var array2 = ['d', 'e', 'f'];

console.log(array1.concat(array2));
// expected output: Array ["a", "b", "c", "d", "e", "f"]

console.log(array1)
// expected output: Array ["a", "b", "c"]
console.log(array2)
// expected output: Array ["d", "e", "f"]
```
- concat方法不会改变this或任何作为参数提供的数组，而是返回一个
**浅拷贝**，它包含与原始数组相结合的相同元素的副本。 原始数组的元素将复制到新数组中。

  + 对象引用（而不是实际对象）：concat将对象引用复制到新数组中。 原始数组和新数组都引用相同的对象。 也就是说，如果引用的对象被修改，则更改对于新数组和原始数组都是可见的。 这包括也是数组的数组参数的元素。

  ```javascript
   var array2 = ['d', 'e', 'f'];
   var a = {a:1,b:2};
   var b = array2.concat(a);
   console.log(b);
   //Array ["d", "e", "f", Object { a: 1, b: 2 }]

   如果修改a对象的值 b中所对应的值也会改变
   a.a = 1730316
   console.log(a);
   //Object { a: 1730316, b: 2 }
   console.log(b);
   //Array ["d", "e", "f", Object { a: 1730316, b: 2 }]
  ```

## 2. slice() 方法返回一个新的数组对象
- 这一对象是一个由 begin 和 end 决定的原数组的浅拷贝（包括 begin，不包括end）。原始数组**不会被改变**。
```javascript
  var animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];
  
  console.log(animals.slice(2));
  // expected output: Array ["camel", "duck", "elephant"]
  
  console.log(animals.slice(2, 4));
  // expected output: Array ["camel", "duck"]
  
  console.log(animals.slice(1, 5));
  // expected output: Array ["bison", "camel", "duck",   "elephant"]
```
>> 自己封装了一个mySlice() 方法
```javascript
var animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];
var a ={az:1,as:2}
Array.prototype.mySlice = function(begin,end){
  begin = begin || 0;
  end = end || this.length;
  var result = [];
  for(var i=begin;i<end;i++){
    result.push(this[i])
  }
  return result;
}
console.log(animals.mySlice(2,0));
//Array ["camel", "duck", "elephant"]
console.log(animals.mySlice(0));
//Array ["ant", "bison", "camel", "duck", "elephant"]
```

### 2.1 slice 方法可以用来将一个类数组（Array-like）对象/集合转换成一个**新数组**。

```javascript
function list() {
  return Array.prototype.slice.call(arguments);
}

var list1 = list(1, 2, 3); // [1, 2, 3]
```

# 第二天
## Array方法查询元素
### 3. indexOf()方法

1. indexOf()方法返回在数组中可以找到一个给定元素的**第一个索引**，如果不存在，则返回-1。
>第一个参数为要**查找的元素**

>第二个参数为**开始查找的位置**
```javascript
var beasts = ['ant', 'bison', 'camel', 'duck', 'bison'];

console.log(beasts.indexOf('bison'));
// expected output: 1

// start from index 2
console.log(beasts.indexOf('bison', 2));
// expected output: 4

console.log(beasts.indexOf('giraffe'));
// expected output: -1
```
>>封装indexOf()
```javascript
Array.prototype.myIndexOf = function(element,begin){
    begin = begin < 0 ? this.length + begin: begin || 0;
    if(element == null){
        return -1;
    }else{
        for(var i = begin;i<this.length;i++){
            if(this[i]==element){
                return i
            }
        }
        return -1;
    }
}
var animals = ['Dodo', 'Tiger', 'Penguin', 'Dodo','Tiger', 'Dodo'];
console.log(animals.myIndexOf("Dodo",-1));
//expected output: 2
```
### 4. lastIndexOf()方法
1. lastIndexOf() 方法返回指定元素（也即有效的 JavaScript 值或变量）在数组中的**最后一个的索引**，如果不存在则返回 -1。从数组的后面向前查找，从 fromIndex 处开始。
>第一个参数为要**查找的元素**

>第二个参数为从**开始位置逆向查找**
```javascript
var animals = ['Dodo', 'Tiger', 'Penguin', 'Dodo'];

console.log(animals.lastIndexOf('Dodo'));
// expected output: 3

console.log(animals.lastIndexOf('Tiger'));
// expected output: 1
```
>>封装lastIndexOf()
```javascript
Array.prototype.mylastIndexOf = function(element,begin){
    begin = begin < 0 ? this.length + begin: begin || 0;
    if(element == null){
        return -1;
    }else{
        for(var i = begin;i>=0;i--){
            if(this[i]==element){
                return i
            }
        }
        return -1;
    }
}
var animals = ['Dodo', 'Tiger', 'Penguin', 'Dodo','Tiger', 'Dodo'];
console.log(animals.mylastIndexOf("Dodo",-1));
//expected output: 5
```

# 第三天
## 
### 5. map()方法
- map() 方法创建一个**新数组**，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果。
- 参数
   - callback
       * 用来测试数组的每个元素的函数。返回 true 表示该元素通过测试，保留该元素，   false 则不保留。它接受以下三个参数：
   - element
       * 数组中当前正在处理的元素。
   - index可选
       * 正在处理的元素在数组中的索引。
   - array可选
       * 调用了 map 的数组本身。 
```javascript
var array1 = [1, 4, 9,,, 16];

// pass a function to map
const map1 = array1.map(x => x * 2);

console.log(map1);
//  Array [2, 8, 18, undefined, undefined, 32]
```
>封装map()方法(映射)
```javascript
Array.prototype.myMap = function(callback){
    var length = this.length;
    var newArr = [];
    for(var i = 0 ; i < length ; i++ ){
        newArr.push(callback(this[i],i,this));
    }
    return newArr;
}
var array1 =[1, 4, 9, 16];
array1.myMap(function(x,index,array){
  	var count = x*2
    console.log(count);
});
var users = [
  {name: "张含韵", "email": "zhang@email.com"},
  {name: "江一燕",   "email": "jiang@email.com"},
  {name: "李小璐",  "email": "li@email.com"}
];
users.myMap(function(x,index,arr,thisArg){
  	console.log(x.name);
});
/*
> "张含韵"
> "江一燕"
> "李小璐"
*/
/*const map1 = array1.myMap(function(x,index,arr){
    return arr
});
console.log(map1);
// expected output: Array [2, 8, 18, 32]
console.log(array1);*/
// expected output: Array [1, 4, 9, 16]
```
### 6. filter() 方法
- filter() 方法创建一个**新数组**, 其包含通过所提供函数实现的测试的所有元素。
- 参数
   - callback
       * 用来测试数组的每个元素的函数。返回 true 表示该元素通过测试，保留该元素，   false 则不保留。它接受以下三个参数：
   - element
       * 数组中当前正在处理的元素。
   - index可选
       * 正在处理的元素在数组中的索引。
   - array可选
       * 调用了 filter 的数组本身。 
```javascript
var words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];

const result = words.filter(word => word.length > 6);

console.log(result);
// expected output: Array ["exuberant", "destruction", "present"]
```

>封装filter()方法
```javascript
Array.prototype.myFilter =function(callback){
    if(typeof callback === "function"){
        var length = this.length;
        var newArr = [];
        for(var i = 0 ; i < length ; i++ ){
            newArr.push(callback(this[i],i,this));
        }
        return newArr;
    }
}
var words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];
words.myFilter(function(x){
  if(x.length>6){
	console.log(x);
}
})
/**
 * > "exuberant"
 * > "destruction"
 * > "present"
 * /
```
# 第四天
## 
### 7. splice() 方法
- splice() 方法通过<font color='red' size=4>删除</font>或<font color=red  size=4>替换</font>现有元素或者<font color=red size=4>原地添加新的元素</font>来修改数组,并以数组形式返回被修改的内容。此方法会**改变原数组**。
- 参数
   - start
       * 指定修改的开始位置（从0计数）。
   - deleteCount 可选
       * 整数，表示要移除的数组元素的个数。
       * 如果 deleteCount 被省略了,就从start开始向后全部数据删除(包含start)
   - item1, item2, ... 可选
       * 要添加进数组的元素,从start 位置开始。如果不指定，则 splice() 将只删除数组元素。
```javascript
var months = ['Jan', 'March', 'April', 'June'];
months.splice(1, 0, 'Feb');
// inserts at index 1
console.log(months);
// expected output: Array ['Jan', 'Feb', 'March', 'April', 'June']

months.splice(4, 1, 'May');
// replaces 1 element at index 4
console.log(months);
// expected output: Array ['Jan', 'Feb', 'March', 'April', 'May']
```
>封装splice()
```javascript
Array.prototype.mySplice = function(){
    var start = arguments[0] || 0;
    var deleteCount = arguments[1] || this.length;
    for(var i = start;i < deleteCount;i++){
        this.pop(this[i]);
    }
    return this;
}
```
### 8. reduce() 方法

# 第五天
## 
### 9. 