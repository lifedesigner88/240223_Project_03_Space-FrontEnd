<script>
import {ref} from 'vue'
import PostList from "pages/post/PostList.vue";
import {axiosInstance} from "boot/axios";
import AppSidebar from "components/layout/AppSidebar.vue";

const BASE_URL = "http://localhost:8080"


export default {
  components: {AppSidebar, PostList},
  setup() {
    const items = ref([{}, {}, {}, {}, {}, {}, {}])
    return {
      slide: ref(1),
      autoplay: ref(true),

      items,
      onLoad(index, done) {
        setTimeout(() => {
          items.value.push({}, {}, {}, {}, {}, {}, {})
          done()
        }, 2000)
      }
    }
  },

  data() {
    return {
      postDatas: [],
    }
  },

  methods: {
    openLink() {
      window.open('https://playdata.io/', '_blank');
    },

    async loadPost() {
      try {
        const response = await axiosInstance.get(`${BASE_URL}/api/post/list`);
        this.postDatas = response.data.result
        this.postDatas.reverse()
      } catch (e) {
        console.log(e + "모든 스페이스 가져오기 실패");
      }
    },
    goToPostDetail(event) {
      console.log(event)
      this.$router.push(`/PostDetail/${event}`);
    }
  },

  created() {
    this.loadPost()
  }
}
</script>

<template>
  <q-page class="sj-container">
    <div class="sj-content">
      <PostList
        id="postSection"
        class="postList__css"
        :postDatas="postDatas"
        @PostDtailOpen="goToPostDetail($event)"
      />
    </div>
  </q-page>
  <AppSidebar></AppSidebar>
</template>


<style lang="scss" scoped>

.sj-container {
  width: 100vw;
  //background-color: red;
  display: grid;
  grid-template-columns: 2.7fr 8fr 1.2fr;
}

.sj-content {
  box-sizing: border-box;
  //background-color: gray;
  width: 100%;
  height: 100%;
  grid-column-start: 2;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
}

.my-card {
  width: 100%;
  max-width: 20vw;
}

.home-page {
  width: 100vw
}

.postList__css {
  padding: 30px;
}
</style>
