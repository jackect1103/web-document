<template>
  <div>
    <label v-if="label">{{label}}</label>
    <!-- 插入formInput组件 -->
    <slot></slot>
    <!-- 显示校验错误信息 -->
    <p v-if="validataStatus === 'error'" class="error">{{errorMessage}}</p>
  </div>
</template>

<script>
/* 
    0:label和prop属性
    1：获取当前输入框的规则
    2：如果输入框和rule不匹配 显示错误信息
    3：formInput组件中输入内容时，通知fromItem做校验（校验的方法）
    4：使用async-validator做校验
*/
// eslint-disable-next-line no-unused-vars
import schema from "async-validator"; //安装async-validator
export default {
  name: "formItem",
  data() {
    return {
      validataStatus: "", //校验的状态值
      errorMessage: "" //错误信息
    };
  },
  created() {
    //存在vue中父级与子组件生命周期的先后顺序问题
    this.$on("validate", this.validate);
  },
  //获取父组件的数据
  inject: ["form"],
  methods: {
    // eslint-disable-next-line no-unused-vars
    //校验方法
    validate(value) {
      // console.log(this.prop);
      // console.log(value);
      
      //存储校验规则
      const descriptor = {
        //this.prop指的是当前输入框的name
        [this.prop]: this.form.rules[this.prop]
      };

      //eslint-disable-next-line no-unused-vars
      var validator = new schema(descriptor);
      validator.validate({ [this.prop]: value }, errors => {
        if (errors) {
          // console.log(errors);
          this.validataStatus = "error";
          this.errorMessage = errors[0].message;
        } else {
          this.validataStatus = "";
          this.errorMessage = "";
        }
      });
    }
  },
  props: {
    label: {
      type: String,
      default: ""
    },
    prop: {
      type: String,
      default: ""
    }
  }
};
</script>

<style  scoped>
.error {
  color: red;
}
</style>