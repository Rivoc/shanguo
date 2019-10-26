<template>
  <div class="loginBox m-t-7 text-left">
    <el-form status-icon
             ref="ruleForm"
             label-width="100px"
             class="lruleForm"
             label-position="top">
      <el-form-item>
        <el-input autocomplete="off"
                  placeholder="用户名/邮箱"
                  v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input type="
                      password"
                  autocomplete="off"
                  placeholder="输入密码"
                  v-model="model.password"></el-input>
      </el-form-item>
      <el-button @click="submitForm">登录</el-button>
    </el-form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      model: {}
    }
  },
  methods: {
    submitForm () {

    }
  }

}
</script>
<style lang="stylus">
.loginBox {
  width: 300px;

  .el-input {
    opacity: 0.85;
  }

  .el-button {
    padding: 12px 45px;
    background: transparent;
    color: white;
  }
}
</style>