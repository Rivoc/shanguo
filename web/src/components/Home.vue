<template>
  <div class="container">
    <div class="wrapper text-white">
      <!-- 岛屿 -->
      <div class="fixed">
        <div class="d-flex jc-center ai-center line"
             :class="{current:(currentPage===0),leave:(currentPage!==0)}">
          <p class="fs-md">彤果2.0客户端正式开启，期待你的加入！</p>
          <img src="../../static/image/download.png"
               alt=""
               height=70
               class="download">
        </div>
        <div class="d-flex jc-center ai-center line"
             :class="{current:(currentPage===1),leave:(currentPage===2)}">
          <p class="fs-md">全新升级的UI，可爱彤果，陪你畅快玩耍！</p>
        </div>
        <div class="
               d-flex
               flex-column
               p-t-8
               jc-center
               ai-center
               line"
             :class="{current:(currentPage===2),leave:(currentPage===3)}">
          <p class="fs-md">热闹缤纷大家庭</p>
          <p class="fs-mmd">丰富的话题圈子，让你快速找到合拍基友</p>
        </div>
        <img src="../../static/image/island.png"
             alt=""
             class="island">
        <div class="adicons d-flex jc-center"
             :class="{current:(currentPage===0),leave:(currentPage!==0)}">
          <img src="../../static/image/stone.png"
               alt=""
               style="position:relative">
        </div>

        <div class="adicons d-flex jc-center"
             :class="{current:(currentPage===1),leave:(currentPage===2)}">
          <img src="../../static/image/c1.png"
               alt=""
               style="position:relative;;left:130px;z-index:1;">
          <img src="../../static/image/c2.png"
               alt=""
               style="position:relative;left:10px;top:-40px">

          <img src="../../static/image/c3.png"
               alt=""
               style="position:relative;left:-185px;top:10px">

          <img src="../../static/image/c4.png"
               alt=""
               style="position:relative;margin-left:-190px;">
          <img src="../../static/image/c5.png"
               alt=""
               style="position:relative;margin-left:-100px;top:20px">
        </div>
        <div class="adicons d-flex jc-center"
             :class="{current:(currentPage===2),leave:(currentPage==3)}">
          <img src="../../static/image/s2.png"
               alt=""
               style="position:relative;left:60px">
          <img src="../../static/image/s1.png"
               alt=""
               style="position:relative;top:-40px">

          <img src="../../static/image/s3.png"
               alt=""
               style="position:relative;left:-40px">
          <img src="
               ../../static/image/s4.png"
               alt=""
               style="position:relative;margin-left:-440px;top:50px">

          <img src="../../static/image/s5.png"
               alt=""
               style="position:relative;margin-left:180px;">
        </div>

      </div>
      <section class="b b0 active">
      </section>
      <section class="b b1">
      </section>
      <section class="b b2">
      </section>
      <section class="b b3">
      </section>
      <section class="b b4">
      </section>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
import 'jquery-easing/dist/jquery.easing.1.3.umd.js'
export default {
  mounted () {
    this.page()
  },
  data () {
    return {
      currentPage: 0
    }
  },
  methods: {
    page () {
      let $container = $('.container')
      let timeout = null
      let _this = this
      // let page = 0// page取值范围0-3
      $container.on('mousewheel', function (e) {
        let ev = e
        if (timeout) {
          clearTimeout(timeout)
        }
        timeout = setTimeout((e) => {
          if (ev.originalEvent.deltaY > 0) {
            if (_this.currentPage < 3) {
              _this.currentPage++
              $('.wrapper').animate({ 'top': `${-100 * _this.currentPage}vh` }, 500, 'easeOutBack')
            }
          } else if (ev.originalEvent.deltaY < 0) {
            if (_this.currentPage > 0) {
              _this.currentPage--
              $('.wrapper').animate({ 'top': `${-100 * _this.currentPage}vh` }, 500, 'easeOutBack')
            }
          }
          console.log(_this.currentPage)
        }, 500)
      })
    }

  }

}
</script>
<style lang="stylus" scoped>
.b {
  height: 100vh;
}

.m1 {
  background: url('../../static/image/bg1.jpg') center no-repeat;
}

.b0 {
  background: url('../../static/image/bg1.jpg') center no-repeat;
}

.b1 {
  background: url('../../static/image/bg2.jpg') center no-repeat;
}

.b2 {
  background: url('../../static/image/bg3.jpg') center no-repeat;
}

.b3 {
  background: url('../../static/image/bg1.jpg') center no-repeat;
}

.b4 {
  background: url('../../static/image/bg1.jpg') center no-repeat;
}

.container {
  height: calc(100vh - 70px);
  background: url('../../static/image/bg1.jpg') center no-repeat;
  overflow: hidden;
}

.fixed {
  position: fixed;
  bottom: -80px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;

  .line {
    img {
      position: relative;
      top: 140px;
      opacity: 0;
    }
  }

  .adicons {
    position: absolute;
    top: 140px;
    left: 50%;
    top: 28%;
    transform: translateX(-55%);
    z-index: 11;

    img {
      opacity: 0;
      transition: all 0.5s;
    }
  }

  p {
    position: absolute;
    top: 50px;
    transition: all 0.5s;
    opacity: 0;
  }

  p+p {
    position: absolute;
    top: 95px;
    transition: all 0.5s;
    opacity: 0;
  }

  .leave {
    img {
      animation: fadeOutUp 0.5s ease-out;
      animation-fill-mode: forwards;
    }

    p {
      animation: zoomOut 1.5s ease-out;
      animation-fill-mode: forwards;
    }
  }

  .current {
    p {
      animation: zoomIn 0.5s ease-out, opacityChange 0.5s ease-out;
      animation-fill-mode: forwards;
      animation-delay: 1s;
    }

    img {
      animation: bounceInDown 1s ease-out, opacityChange 1s ease-out;
      animation-fill-mode: forwards;
      animation-delay: 0.5s;
    }
  }
}

.wrapper {
  position: relative;
}
</style>
