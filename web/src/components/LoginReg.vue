<template>
  <div id="login"
       class="text-white d-flex ai-center jc-center">
    <div class="mask-container"
         ref="bg">
    </div>
    <div class="bgMask transition-500"
         ref="bgMask"></div>
    <div class="loginReg">
      <router-link tag="div"
                   :to="rpath">{{text}}</router-link>
    </div>
    <div class="content-area d-flex jc-center ai-center flex-column text-center">
      <h1 class="fs-20 fwn">欢迎来到山果</h1>
      <h2 class="fs-50 fwn m-t-7 m-b-4">专业&nbsp;严谨&nbsp;有趣</h2>
      <h3 class="fs-14 fwn">不止于提供游戏，我们有追求。我们追求更好的游戏，更棒的用户体验，更完善的社交生态。</h3>
      <h3 class="fs-14 fwn m-t-1">这里是骨灰玩家的终极选择</h3>
      <router-view></router-view>

    </div>

  </div>
</template>
<script>
export default {
  data () {
    return {
      bgList: ['../../static/image/lg1.jpg', '../../static/image/lg2.jpg', '../../static/image/lg3.jpg', '../../static/image/lg4.jpg', '../../static/image/lg5.jpg', '../../static/image/lg6.jpg', '../../static/image/lg7.jpg', '../../static/image/lg8.jpg', '../../static/image/lg9.jpg']
    }
  },
  methods: {
    changeMask () {
      let i = 0.5
      let _this = this
      let num = 0
      return function mask () {
        if (i > 1) {
          i = 0.5
        }

        _this.$refs.bgMask.classList.remove('transition-500')
        _this.$refs.bgMask.classList.add('transition-100')
        _this.$refs.bgMask.style.background = `rgba(0,0,0,${i})`
        i += 0.5
        if (i === 1) {
          if (num === _this.bgList.length) {
            num = 0
          }
          _this.$refs.bg.style.background = `url(${_this.bgList[num]}) center no-repeat/cover`

          num++
        } else {
          _this.$refs.bgMask.classList.remove('transition-100')
          _this.$refs.bgMask.classList.add('transition-500')
        }
        // 当遮罩要变成全黑时设置变化时间为5s，当遮罩要变成半透明设置变化时间为3s
        setTimeout(mask, i === 1 ? 5000 : 2500)
      }
    }
  },

  mounted () {
    this.changeMask()()
    console.log(this.path)
  },
  computed: {
    text () {
      return this.$route.path === '/login' ? '去注册' : '去登录'
    },
    rpath () {
      return this.$route.path === '/login' ? '/register' : '/login'
    }
  }

}
</script>
<style lang="stylus" scoped>
#login {
  position: relative;
  width: 100%;
  height: 100vh;

  .mask-container {
    position: absolute;
    width: 100%;
    height: 100vh;
    z-index: -2;
  }

  .bgMask {
    position: absolute;
    z-index: -1;
    background: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100vh;
    -webkit-transform: translate3d(0, 0, 0);
  }
}

.transition-100 {
  transition: all 2s;
}

.transition-500 {
  transition: all 3.5s;
}

.loginReg {
  padding: 10px 30px;
  border: 2px solid #fff;
  border-radius: 5px;
  position: absolute;
  top: 0;
  right: 20px;
}
</style>
