/*
    Buffer(缓冲区)
        - buffer的结构和数组相似，操作的方法也和数组类似
        - 数组中不能存储二进制的文件，而buffer就是专门用来存储二进制数据
        - Buffer 不需要导入任何包
        - Buffer 里面存储的是二进制数据，但是以16进制显示
        - bit -> byte -> kb -> mb -> gb -> tb (一个英文占用8位bit，也是1个字节byte；中文占用3个字节byte)
        - byte（字节）是计算机中的最小单位
 */

var str = 'agoni joey'
var str2 = '黄俊炎 joey'
var bf = Buffer.from(str);
var bf2 = Buffer.from(str2);
/*console.log(bf);
console.log('占用内存的大小:',bf.length); //占用内存的大小
console.log('占用字符串的大小:',str.length); //占用字符串的大小
console.log(bf2);
console.log(str);
console.log(str2);*/

//创建1024byte（1kb）的buffer
//不建议使用
// var buf = new Buffer(1024);

//使用buffer.allo(size,file,encoding ) 创建buffer
const buf2 = Buffer.alloc(5, 'a');

console.log(buf2);

console.log(buf2.toJSON());