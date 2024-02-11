<script>
import postDatas from "./assets/data/postdata";
import LoginCompo from "@/components/LoginCompo.vue";

export default {
  name: 'App',
  components: {LoginCompo},
  data() {
    return {
      postDatas,
      LoginOpened: true,
    }
  }
}

</script>


<template>

  <LoginCompo
      v-if="LoginOpened"
      @CloseLogin="LoginOpened = false"
  />

  <header>1</header>
  <div class="left__menu"></div>
  <router-view
      :postDatas="postDatas"
  />
  <div class="right--menu"></div>
  <footer>

    <h1>모집중인 과정을 확인해보세요!</h1>
    <div class="footer__imgs">
      <a href="https://playdata.io/bootcamp_backend" target="_blank">
        <img src="https://cdn.imweb.me/thumbnail/20240104/399f0d130353d.png" alt=""/>
      </a>
      <a href="https://playdata.io/bootcamp_backend" target="_blank">
        <img src="https://cdn.imweb.me/thumbnail/20231214/9a493146af699.png" alt=""/>
      </a>
      <a href="https://playdata.io/bootcamp_backend" target="_blank">
        <img src="https://cdn.imweb.me/thumbnail/20231214/ffebdf95fb44c.png" alt=""/>
      </a>
    </div>

  </footer>

</template>


<style>

header {
  background-color: blue;
  position: fixed;
  width: 100%;
  height: 4.5vh;
  z-index: 1;
}

.left__menu {
  width: 50%;
  min-width: 50px;
  background-color: red;

  &:hover {
    width: 100%;
  }

  transition: width 1s ease 0s;
  grid-area: b;
}


.right--menu {
  width: 50%;
  transition: width 1s ease 0s;

  &:hover {
    width: 100%;
  }

  background-color: green;
  justify-self: right;
  grid-area: d;
}

footer {
  background-color: rgba(255,255,255,0.1);
  position: fixed;
  width: 100%;
  height: 35vh;
  bottom: -29vh;
  transition: bottom 1s ease 0s;
  &:hover {bottom: 0;}

  h1 {
    background:linear-gradient(180deg,rgba(255,255,255,0.1), rgba(239, 239, 239, 0.8),rgba(255,255,255,0.1) ) ;
    text-align: center;
    font-size: 20px;
    font-style: normal;
    padding: 1.2vh;
    transition: 1s ease 0s;
    &:hover {opacity: 0}
  }

  .footer__imgs {
    display: flex;
    justify-content: center;
    gap: 1vw;
    a {
      width: 30%;
      img {
        width:100%;
        max-width: 400px;
        opacity: 0.3;
        transition: 0.5s ease 0s;
        &:hover {
          opacity: 1
        }
      }
    }


  }
}

</style>
