<template>
  <div> 
    <slot></slot>
  </div>
</template>

<script>
export default {
  //父组件传值给所有后代组件
  provide() {
    return {
      form: this
    };
  },
  props: {
    //存储用户规定的校验规则
    model: {
      type: Object,
      require: true
    },
    rules: {
      type: Object
    }
  },
  methods: {
    name() {}
  }
};
</script>

<style lang="scss" scoped>
</style>