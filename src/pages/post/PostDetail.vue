<template>
  <div class="q-ma-md">
    <q-breadcrumbs class="text-orange" active-color="secondary" >
      <q-breadcrumbs-el :label="`${postDetail.spaceType} ${postDetail.spaceName}`" icon="widgets" />
      <!-- <q-breadcrumbs-el :label="`${postDetail.title}`" /> -->
    </q-breadcrumbs>
    <div class="row no-wrap items-center q-mt-md q-pa-sm bg-grey-9 text-white rounded-borders">
      <div class="nickname">WRITER: {{ postDetail.nickname }}</div>
      
      <q-space style="margin-right: 100px" />
  
      <div class="status">
          <div>{{ postDetail.postStatus }}</div>
          <!-- <div>Created: {{ postDetail.created_at }}</div>
          <div>Updated: {{ postDetail.updated_at }}</div> -->
      </div>
      <q-space />
      <q-btn color="primary" label="Menu">
        <q-menu>
          <q-list style="min-width: 100px">
            <q-item clickable v-close-popup>
              <q-item-section>New tab</q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section>New incognito tab</q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable v-close-popup>
              <q-item-section>Recent tabs</q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section>History</q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section>Downloads</q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable v-close-popup>
              <q-item-section>Settings</q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable v-close-popup>
              <q-item-section>Help &amp; Feedback</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
  </div>

    <q-scroll-area
      :thumb-style="thumbStyle"
      :bar-style="barStyle"
      style="height: 400px; max-width: 2000px; background-color: white;"
    > 
    <div class="container">
      <p> Created At: {{ postDetail.created_at }}</p> 
      <p> Updated At: {{ postDetail.updated_at }}</p>
    </div>
    <div v-if="postDetail" class="q-pa-xs" >
      <h3>{{ postDetail.title }}</h3>
      <img :src="getImageUrl(postDetail.thumbnail)"  alt="Thumbnail" style="max-width: 100%;" />
      <p>{{ postDetail.contents }}</p>
    </div>
    </q-scroll-area>
  </div>
</template>

<script>
import axios from "axios";
import {axiosInstance} from "boot/axios";
const BASE_URL = "http://localhost:8080"

export default {
  data () {
    return {
      thumbStyle: {
        right: '4px',
        borderRadius: '5px',
        backgroundColor: '#027be3',
        width: '5px',
        opacity: 0
      },

      barStyle: {
        right: '2px',
        borderRadius: '9px',
        backgroundColor: '#027be3',
        width: '9px',
        opacity: 0.2
      },

      postDetail: {}
    };
  },
  methods:{
    async getPostDetail() {
      try {
        console.log(TOKEN)
        const response = await axiosInstance.get(`${BASE_URL}/api/post/detail/14`);
        this.postDetail = response.data.result
        console.log(this.postDetail);
      } catch (e) {
        console.log(e + "게시글을 불러오지 못했습니다.");
      }
    },
    getImageUrl(thumbnailPath) {
    // 정적 리소스 폴더의 경로와 이미지 파일명을 조합하여 URL 생성
    return `/src/main/resources/static/images/${thumbnailPath}`;
  }
  },
  created(){
    this.getPostDetail()
    this.getImageUrl()
  },
}
</script>
<style>
  .container {
    text-align: right;
  }
</style>

