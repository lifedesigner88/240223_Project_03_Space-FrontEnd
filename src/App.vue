<script>
import postDatas from "./assets/data/postdata";

export default {
  name: 'App',
  data(){
    return {
      postDatas,
    }
  }
}

</script>


<template>

  <header>1</header>
  <div class="left__menu"></div>
  <router-view
    :postDatas="postDatas"
  />
  <div class="right--menu"></div>
  <footer></footer>

</template>


<style>

header {
  background-color: blue;
  position:fixed;
  width: 100%;
  height: 5vh;
  z-index: 1;
}

.left__menu {
  width: 50%;
  min-width: 50px;
  background-color: red;
  &:hover{width:100%;}
  transition: width 1s ease 0s;
  grid-area: b;
}


.right--menu {
  width: 50%;
  transition: width 1s ease 0s;
  &:hover{width:100%;}
  background-color: green;
  justify-self: right;
  grid-area: d;
}

footer {
  background-color: yellow;
  position: fixed;
  width: 100%;
  height: 4.5vh;
  transition: height 1s ease 0s;
  &:hover{height:30vh;}
  bottom:0;
}

</style>
