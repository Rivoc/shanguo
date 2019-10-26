<template>
  <div class="loginBox m-t-7 text-left">
    <el-form :model="model"
             status-icon
             :rules="rules"
             ref="model"
             label-width="100px"
             label-position="top">
      <el-form-item prop="username">
        <el-input autocomplete="off"
                  placeholder="用户名/邮箱"
                  v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="
                      password"
                  autocomplete="off"
                  placeholder="输入密码"
                  v-model="model.password"></el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input type="password"
                  autocomplete="off"
                  placeholder="确认密码"
                  v-model="model.checkPass"></el-input>
      </el-form-item>
      <el-button @click="submitForm">注册</el-button>
    </el-form>
  </div>
</template>
<script>
export default {
  data () {
    var checkUsername = (rule, value, callback) => { // 自定义规则名，是一个函数，通过校验就返回callback()  错误就返回  callback(new Error('xxx'))
      if (value === '') {
        return callback(new Error('请输入用户名'))
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (value.length < 6) {
        callback(new Error('密码长度不能小于6位'))
      } else {
        if (this.model.checkPass !== '') { // 如果用户先在确认密码一栏输入，再在输入密码里输入，确认密码一栏的报错就不会消失，所以要再手动调用一次校验
          this.$refs.model.validateField('checkPass')// 调用校验方法(),传参：校验字段
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.model.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      model: {
        password: '',
        checkPass: '',
        username: ''
      },
      rules: {
        password: [
          { validator: validatePass, trigger: 'blur' }// 输入框失去焦点时触发
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        username: [
          { validator: checkUsername, trigger: 'blur' }
        ]
      }
    }
  }
}

</script>
<style lang="stylus" scoped>
.s {
  position: relative;
  height: 500px;
  width: 100px;
  background-color: #fff;
}
</style>
