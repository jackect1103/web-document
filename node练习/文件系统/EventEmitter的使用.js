/*
    events事件模块
    1.Nodejs的大部分核心API都是基于异步事件驱动设计的，所有可以分发事件的对象都是EventEmitter类的实例
    2.EventEmitter实例可以使用on或addListener监听事件，emit()方法分发事件
    3.EventEmiter实例可以绑定多个事件,EventEmiter会以同步模式执行
 */
const events = require('events'),
    EventEmitter = events.EventEmitter,
    util = require('util');

function myEmiter() {
    EventEmitter.call(this);
    // console.log(this);
};
util.inherits(myEmiter, EventEmitter);//继承EventEmitter类
const myEmitterIns = new myEmiter();

myEmitterIns.on('data', (o) => {
    console.log('data事件开始执行...');
    console.log('receive the data:' + o.a);
    // console.log(o);
});

myEmitterIns.on('data1',(data1)=>{
    console.log("data1事件开始执行...");
});

myEmitterIns.emit('data',{a:1});//emit()方法分发事件

myEmitterIns.emit('data1',{a:1});
console.log('******');
console.log('myEmitterIns实例的data事件绑定了%d个回调函数',myEmitterIns.listenerCount('data'));
console.log('它们是：',myEmitterIns.listeners('data'));
