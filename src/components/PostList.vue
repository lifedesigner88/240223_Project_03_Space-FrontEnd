<script>
export default {
  name: "PostList",
  props: {
    postDatas: Object,
  }
}
</script>

<template>
  <div class="postbox">
    <div class="postcard" v-for="(data, i) in postDatas" :key="i">
      <div class="postcard__title">{{ data.title }}</div>
      <img :src="data.image" alt=""/>
    </div>
  </div>
</template>

<style scoped>

.postbox {
  grid-area: c;
  padding-top: 4vh;;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 10px
}

.postcard {
  background-color: steelblue;
  height: 300px;
  border-radius: 20px;
  position: relative;

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    border-radius: 20px;
  }

  .postcard__title {
    width: 70%;
    position: absolute;
    border-bottom-left-radius: 20px;
    bottom: 0;
    background: linear-gradient(90deg, rgba(1, 1, 1, 0.5), rgba(1, 1, 1, 0));
    font-size: 20px;
    padding: 25px;
    text-align: left;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    color: white;
  }
}

</style>