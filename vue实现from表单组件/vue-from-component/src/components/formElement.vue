<template>
  <div>
    <!-- 自己定义的form表单组件 -->
    <m-form :model="ruleForm" :rules="rules">
      <m-form-item label="用户名" prop="name">
        <m-Input v-model="ruleForm.name"></m-Input>
      </m-form-item>
      <m-form-item label="密码" prop="pwd">
        <m-Input type="password" v-model="ruleForm.pwd"></m-Input>
      </m-form-item>
    </m-form>
    {{ruleForm}}
  </div>
</template>

<script>
import MInput from "@/components/formInput.vue";
import MFormItem from "@/components/formItem.vue";
import MForm from "@/components/form.vue";
export default {
  name: "formElement",
  components: {
    MInput,
    MFormItem,
    MForm
  },
  data() {
    return {
      ruleForm: {
        name: "",
        pwd: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入名称" },
          { min: 6, max: 10, message: "请输入6-10为用户名" }
        ],
        pwd: [{ required: true, message: "请输入密码 " }]
      }
    };
  }
};
</script>
<style lang='' scoped>
</style>