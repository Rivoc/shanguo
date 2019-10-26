<template>
  <div>
    <header>
      <nav class="d-flex ai-center jc-between px-8 bg-dark1">
        <div class="logo d-flex ai-center">
          <img src="../../static/image/logo.png"
               alt=""
               width=40><span>彤果</span>
        </div>
        <ul class="d-flex jc-around flex-1">
          <li>首页</li>
          <li>游戏库</li>
          <li>社区</li>
          <li>客户端</li>
        </ul>
        <div class="search mx-7">
          <input type="text">
          <select name=""
                  id=""></select>
          <i></i>
        </div>
        <div class="user d-flex jc-around">
          <router-link to="/loginReg"
                       tag="div">登录</router-link>
          <router-link to="/register"
                       tag="div">注册</router-link>
        </div>
      </nav>
    </header>
    <router-view></router-view>
  </div>
</template>
<script>
export default {

}
</script>
<style lang="stylus" scoped>
header {
  height: 70px;
}

header nav {
  width: 100%;
  height: 70px;
  position: fixed;
  z-index: 13;
}

ul li {
  padding: 0 5px;
  height: 68px;
  line-height: 68px;
  border-bottom: 2px transparent #f8b95d;
}

.logo {
  width: 110px;
}

.search {
  width: 250px;
}

.user {
  width: 130px;
}
</style>
