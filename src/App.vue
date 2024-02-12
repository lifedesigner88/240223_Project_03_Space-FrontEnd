<script>
import postDatas from "./assets/data/postdata";
import LoginCompo from "@/components/LoginCompo.vue";
import PostDetail from "@/components/PostDetail.vue";

export default {
  name: 'App',
  components: {PostDetail, LoginCompo},
  data() {
    return {
      postDatas,
      pageText: 'encore SPACE',
      LoginOpened: false,
      menuOpend: false,
      footerOpend: true,
      postDetailOpend: false,
      clickedPost: Object,
      like:0,
      dislike:0,
    }
  },

  methods: {
    logined() {
      this.LoginOpened = false;
      this.menuOpend = true;
      this.footerOpend = false;
    },
    noLogin() {
      this.LoginOpened = false;
    },

    logout(){
      this.LoginOpened = true;
      this.menuOpend = false;
      this.footerOpend = true;
    }
  }
}

</script>


<template>

  <LoginCompo
      v-if="LoginOpened"
      @CloseLogin="noLogin"
      @LogineSucceed="logined"
  />
  <PostDetail
      v-if="postDetailOpend"
      :post = clickedPost
      :like = like
      :dislike= dislike
      @PostDetailClose = "postDetailOpend=false"
      @like = "like++"
      @dislike = "dislike++"
  />


  <header>
    <div class="header__left">
      <h1>{{ pageText }}</h1>
    </div>

    <div class="header__right">
      <form class="header__right__searchbox" action="">
        <input type="text" placeholder="Search here">
        <i class="search__svg"></i>
      </form>
      <div class="header__right__icons">
        <i class="header__right__icons__bell">
          <div>4</div>
        </i>
        <i class="header__right__icons__email">
          <div>2</div>
        </i>
        <i class="header__right__icons__calendar">
          <div>3</div>
        </i>
      </div>
      <div class="header__right__logout" @click="logout">
        Logout
      </div>
    </div>
  </header>

  <div
      class="left__menu"
      v-if="menuOpend">

    <div class="left__menu__empty"></div>
    <div class="left__menu__navibtn">
      <div class="navibtn__myspace"><i></i><span>My SPACE</span></div>
      <div class="navibtn__teamspace"><i></i><span>Team SPACE</span></div>
      <div class="navibtn__groupspace"><i></i><span>Group SPACE</span></div>
      <div class="navibtn__kanban"><i></i><span>Kanban</span></div>
      <div class="navibtn__Calendar"><i></i><span>Calendar</span></div>
      <div class="navibtn__Messages"><i></i><span>Messages</span></div>
    </div>
    <div class="left__menu__profile">3</div>
    <div class="left__menu__copyright">4</div>


  </div>

  <router-view
      :postDatas="postDatas"
      @PostDtailOpen="postDetailOpend = true; clickedPost=$event"
  />
  <div
      class="right--menu"
      v-if="menuOpend"
  >

  </div>

  <!--  footer -->
  <footer v-if="footerOpend">
    <h1>모집중인 과정을 확인해보세요!</h1>
    <div class="footer__imgs">
      <a href="https://playdata.io/bootcamp_backend" target="_blank">
        <img alt="" src="https://cdn.imweb.me/thumbnail/20240104/399f0d130353d.png"/>
      </a>
      <a href="https://playdata.io/bootcamp_backend" target="_blank">
        <img alt="" src="https://cdn.imweb.me/thumbnail/20231214/9a493146af699.png"/>
      </a>
      <a href="https://playdata.io/bootcamp_backend" target="_blank">
        <img alt="" src="https://cdn.imweb.me/thumbnail/20231214/ffebdf95fb44c.png"/>
      </a>
    </div>
  </footer>

</template>


<style>
@import "css/header.css";
@import "css/menu.css";
@import "css/footer.css";

</style>
