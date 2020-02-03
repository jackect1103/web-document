//将函数 fn 的执行上下文改为 obj 对象

var obj = { greeting: 'Hello', name: 'Rebecca' }
function fn() {
    return this.greeting + ', ' + this.name + '!!!';
}
function speak(fn, obj) {
    // console.log(fn.call(obj));
}
speak(fn, obj);

/**
 * 实现函数 functionFunction，调用之后满足如下条件：
 * 1、返回值为一个函数 f
 * 2、调用返回的函数 f，返回值为按照调用顺序的参数拼接，拼接字符为英文逗号加一个空格，即 ', '
 * 3、所有函数的参数数量为 1，且均为 String 类型
 */
function functionFunction(str) {
    return function (word) {
        return str + ', ' + word
    }
}
// console.log(functionFunction('Hello')('world'))

/**
 * 实现函数 makeClosures，调用之后满足如下条件：
 * 1、返回一个函数数组 result，长度与 arr 相同
 * 2、运行 result 中第 i 个函数，即 result[i]()，结果与 fn(arr[i]) 相同
 */
var arr = [1, 2, 3];
function fnMake(x) {
    return x * x;
}
function makeClosures(arr, fn) {
    var result = new Array();
    for (let i = 0; i < arr.length; i++) {
        result[i] = function () {
            return fn(arr[i]); //let声明的变量只在let所在代码块内有效，因此每次循环的i都是一个新的变量           
        };
    }
    return result;
}
// console.log(makeClosures(arr, fnMake)[1]);

/**
 * 已知函数 fn 执行需要 3 个参数。请实现函数 partial，调用之后满足如下条件：
*  1、返回一个函数 result，该函数接受一个参数
*  2、执行 result(str3) ，返回的结果与 fn(str1, str2, str3) 一致
 */
var sayIt = function (greeting, name, punctuation) {
    return greeting + ', ' + name + (punctuation || '!');
};
function partial(fn, str1, str2) {
    function result(str3) {
       return fn.call(this,str1,str2,str3)
    }
    return result;
}
// console.log('partial:', partial(sayIt, 'Hello', 'Ellie')('!!!')); //Hello, Ellie!!!

/**
 * 函数 useArguments 可以接收 1 个及以上的参数。请实现函数 useArguments，
 * 返回所有调用参数相加后的结果。本题的测试参数全部为 Number 类型，不需考虑参数转换。
 */
function useArguments() {
    var sum = 0;
    for(let i =0;i<arguments.length;i++){
        sum += arguments[i]
    }
    return sum
}
useArguments(1, 2, 3, 4);

/**
 * 实现函数 callIt，调用之后满足如下条件
 * 1、返回的结果为调用 fn 之后的结果
 * 2、fn 的调用参数为 callIt 的第一个参数之后的全部参数
 */

function callIt(fn) {
    //将arguments转化为数组后，截取第一个元素之后的所有元素
    var args = Array.prototype.slice.call(arguments,1);
    //调用fn
    var result = fn.apply(null,args);
    return result;
}