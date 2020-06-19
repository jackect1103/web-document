<template>
  <div>
    <!-- 创建表单组件 --> 
    <!-- 通过v-bind:value 和 v-on:input 来实现数据双向绑定 -->
    <input :type="type" :value="inputValue" @input="handchangeValue" />
  </div>
</template>

<script>
export default {
  name: "formInput",
  components: {},
  props: {
    //type表单类型 text submit button
    type: {
      type: String,
      default: "text"
    },
    fromValue: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      //防止子组件改变父组件数据
      inputValue: this.fromValue
    };
  },
  //方法集合
  methods: {
    // eslint-disable-next-line no-unused-vars
    handchangeValue(e) {
      // eslint-disable-next-line no-console
      this.inputValue = e.target.value;
      //实现数据双向绑定
      //触发父组件中的input事件，并且传递参数
      //子组件在传值的时候，选用input，如this.$emit(‘input’,val)，在父组件直接用v-model绑定，就可以获取到了
      this.$emit("input", this.inputValue);

      //通知父组件触发校验方法
      //$bus事件(中央事件总线)
      this.$parent.$emit('validate',this.inputValue);
    }
  }
};
</script>
<style lang='' scoped>
</style>