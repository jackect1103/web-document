Page({
  data: {
    number:0,
    list:[
      { name: 'agoni', age: 18 },
      { name: 'jackect', age: 18 },
      { name: 'jack', age: 18 },
      { name: 'kobe', age: 18 },
      { name: 'roin', age: 18 }
    ]
  },
  handleClick(){
    //由于小程序不能像vue那样数据双向绑定
    //通过this.setData()里改变data的数据
    this.setData({
      number:this.data.number+1
    })
    console.log(this.data.number);
  },
  getUserInfo(event){
    console.log(event)
  }
})