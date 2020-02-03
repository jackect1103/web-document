<template>
  <div>
    <children />
    <h1>vue中父级与子组件生命周期的先后顺序</h1>
    <li>beforeCreate父级</li>
    <li>created父级</li>
    <li>beforeMount父级</li>
    <br>
    <li>beforeCreate子级</li>
    <li>created子级</li>
    <li>beforeMount子级 </li>
    <li>mounted子级 </li>
    <br>
    <li>mounted父级 挂载到实例上 </li>
    
    <li>beforeDestroy父级 实例销毁前 </li>
    <br>
    <li>beforeDestroy子级 </li>
    <li>destroyed子级 </li>
    <li>destroyed父级 实例销毁完成 </li>
    

    <h3>
      子级mounted挂载实例比父级mounted挂载实例要快1毫秒
      当父组件执行完beforeMount挂载开始后，会依次执行子组件中的钩子，直到全部子组件mounted挂载到实例上，父组件才会进入mounted钩子
    </h3>

    <h3>子级数据更新</h3>
    <li>beforeUpdate父级  </li>
    <li>beforeUpdate子级 </li>
    <li>Updated子级 </li>
    <li>Updated父级 </li>
    
  </div>
</template>

<script>
import children from "@/components/children";
export default {
  components: {
    children
  },
  beforeCreate() {
    const time = new Date().getTime();
    console.group("beforeCreate父级 实例初始化进行数据观测/事件配置", time);
  },
  created() {
    const time = new Date().getTime();
    console.log("created父级 实例创建完成", time);
  },
  beforeMount() {
    const time = new Date().getTime();
    console.group("beforeMount父级 挂载开始", time);
  },
  mounted() {
    const time = new Date().getTime();
    console.log("mounted父级 挂载到实例上", time);
  },
  beforeUpdate() {
    const time = new Date().getTime();
    console.group("beforeUpdate父级 数据更新前", time);
  },
  updated() {
    const time = new Date().getTime();
    console.log("updated父级 组件DOM更新", time);
  },
  beforeDestroy() {
    const time = new Date().getTime();
    console.log("updated父级", time);
    console.group("beforeDestroy父级 实例销毁前", time);
  },
  destroyed() {
    const time = new Date().getTime();
    console.log("destroyed父级 实例销毁完成", time);
  }
};
</script>