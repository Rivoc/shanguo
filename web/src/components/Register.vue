<template>
  <div class="loginBox m-t-7 text-left">
    <el-form :model="model"
             status-icon
             :rules="rules"
             ref="model"
             label-width="100px"
             label-position="top">

      <!-- 用户名 -->
      <el-form-item prop="username">
        <el-input autocomplete="off"
                  placeholder="用户名/邮箱"
                  v-model="model.username"></el-input>
      </el-form-item>
      <!-- 用户名end -->

      <!-- 验证码 -->
      <div class="d-flex">
        <el-form-item>
          <el-input autocomplete="off"
                    placeholder="输入验证码"
                    v-model="model.code">
          </el-input>
        </el-form-item>
        <div class="m-t-1 m-l-1"
             style="white-space:nowrap">
          <span v-show="!codeSend"
                @click="sendVerifyCode">发送验证码</span>
          <span v-show="codeSend">{{countDown}}s&nbsp;后重新发送</span>
        </div>
      </div>
      <!-- 验证码end -->

      <!-- 密码 -->
      <el-form-item prop="password">
        <el-input type="
                      password"
                  autocomplete="off"
                  placeholder="输入密码"
                  v-model="model.password"></el-input>
      </el-form-item>
      <!-- 密码end -->

      <!-- 确认密码 -->
      <el-form-item prop="checkPass">
        <el-input type="password"
                  autocomplete="off"
                  placeholder="确认密码"
                  v-model="model.checkPass"></el-input>
      </el-form-item>
      <el-button @click="submitForm(model)">注册</el-button>
    </el-form>
    <!-- 确认密码end -->
  </div>
</template>
<script>
export default {
  data () {
    var checkUsername = (rule, value, callback) => { // 自定义规则名，是一个函数，通过校验就返回callback()  错误就返回  callback(new Error('xxx'))
      var reg = /^[1][3,4,5,7,8][0-9]{9}$/
      var reg2 = /[a-zA-Z0-9]{1,10}@[a-zA-Z0-9]{1,5}\.[a-zA-Z0-9]{1,5}/
      var reg3 = /[a-zA-Z0-9]{1,10}@/
      if (value === '') {
        callback(new Error('不能为空'))
      }
      if (reg3.test(value)) {
        if (!reg2.test(value)) {
          this.model.username = ''
          callback(new Error('请正确填写邮箱'))
        }
      }
      // if (!reg.test(value)) {
      //   this.model.username = ''
      //   callback(new Error('请正确填写手机号'))
      // }
    }

    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (value.length < 6) {
        callback(new Error('密码长度不能小于6位'))
        this.model.password = ''
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
        this.model.checkPass = ''
      } else {
        callback()
      }
    }
    return {
      countDown: 60,
      mail: '',
      model: {
        password: '',
        checkPass: '',
        username: '',
        codeSend: false,
        //用户输入的验证码
        code: ''
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
  },
  methods: {
    async sendVerifyCode () {
      console.log('点击了')
      console.log(this.model.username)
      await this.$http.post('/getMailCode', { mail: this.model.username })
      // 开始倒计时
      this.codeSend = true
      this.timeIntervalID = setInterval(() => {
        this.countDown--
        // 如果减到0 则清除定时器
        if (this.countDown === 0) {
          clearInterval(this.timeIntervalID)
          this.codeSend = false
          this.countDown = 60
        }
      }, 1000)
    },
    async submitForm (value) {
      console.log(value)
      if (value.password === '' || value.checkPass === '' || value.username === '') {
        this.$message.error('请将信息填写完全哦')
        return
      }

      let data = await this.$http.post('rest/users', this.model)
      console.log(data)
      console.log('提交了')
    }
  },
  beforeRouteLeave (to, from, next) {
    this.$confirm('注册尚未完成，确定离开吗?', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      next()
    }
    ).catch(() => {
      next(false)
    })
    // const answer = window.confirm('当前页面数据未保存，确定要离开？')
    // if (answer) {
    //   next()
    // } else {
    //   next(false)
    // }
  },
  mounted () {
    window.onbeforeunload = function (e) {
      e = e || window.event
      // 兼容IE8和Firefox 4之前的版本
      if (e) {
        e.returnValue = '关闭提示'
      }

      // Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
      return '关闭提示'
    }
  },
  destroyed () {
    console.log('页面离开了')
    window.onbeforeunload = null
  }
}
</script>
