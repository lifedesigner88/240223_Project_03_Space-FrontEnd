<template>
  <q-page class="my-page row container">
    <!-- 사이드 바 -->
    <AppSidebar></AppSidebar>

    <q-item-section>

  <div class="q-ma-md">
    <q-breadcrumbs class="text-orange" active-color="secondary" >
      <q-breadcrumbs-el :label="`${postDetail.spaceType} ${postDetail.spaceName}`" icon="widgets" />
    </q-breadcrumbs>
 
    <div class="row no-wrap items-center q-mt-md q-pa-sm bg-grey-9 text-white rounded-borders">
      <div> WRITER: {{ postDetail.nickname || 'N/A' }}</div>
      <q-space />
        <div class="status-item"> STATUS: {{ postDetail.postStatus }}</div>
        <div class="status-item"> HEARTS: {{ postDetail.postHearts }}</div>
    </div>
    <q-scroll-area
      :thumb-style="thumbStyle"
      :bar-style="barStyle"
      style="height: 400px; max-width: 2000px; background-color: white;"
    > 
    <div >
      <p class="date-item">  Created At: {{ formatDateTime(postDetail.created_at) }}</p> 
      <p class="date-item">  Updated At: {{ formatDateTime(postDetail.updated_at) }}</p>
    </div>
    <div v-if="postDetail" class="q-pa-xs" >
      <h3>{{ postDetail.title }}</h3>
      <q-card flat bordered class="q-pa-md q-ma-lg">
        <div v-html="renderedHtml"></div>
      </q-card>
    </div>
    </q-scroll-area>
    
    <div class="row no-wrap items-center q-mt-md q-pa-sm bg-grey-9 text-white rounded-borders">
      <div>COMMENTS: {{ postDetail.commentCounts }}</div>
    </div>
    
    <q-scroll-area
      :thumb-style="thumbStyle"
      :bar-style="barStyle"
      style="height: 400px; max-width: 2000px; background-color: white;"
    > 
    <div v-for="comment in postComments" :key="comment.id">
      <q-card flat bordered class="my-card" :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2'">
        <q-card-section>
          <div class="text-h7"> 작성자: {{ comment.nickname }}</div>
        </q-card-section>
        <q-card-section>
          <div class="text-h6"> {{ comment.contents }}</div>
        </q-card-section>
<!--         
        <div class="col-auto">
              <q-btn color="grey-7" round flat icon="more_vert">
                <q-menu cover auto-close>
                  <q-list>
                    <q-item clickable>
                      <q-item-section>삭제</q-item-section>
                    </q-item>
                    <q-item clickable>
                      <q-item-section>Share</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
            </div>
          </div> -->

          <q-separator />
    
          <q-card-actions>
            <q-btn flat>답글</q-btn>
            <q-btn flat>좋아요{{ comment.commentHearts }}</q-btn>
          </q-card-actions>
        </q-card>
    </div>
    </q-scroll-area>

</div>
<q-space />

</q-item-section>
</q-page>
</template>

<script>
import {axiosInstance} from "boot/axios";
import AppSidebar from "src/components/layout/AppSidebar.vue";

import moment from 'moment';
const BASE_URL = "http://localhost:8080"

export default {
  components: {AppSidebar},
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
       // 서버에서 받아온 게시글 데이터
       postDetail: { },
       postComments: []
    };
  },
  methods:{
    async getPostDetail() {
      try {
        const response = await axiosInstance.get(`${BASE_URL}/api/post/detail/6`);
        this.postDetail = response.data.result
        console.log(this.postDetail);
      } catch (e) {
        console.log(e + "게시글을 불러오지 못했습니다.");
      }
    },
    formatDateTime(dateTime) {
      return moment(dateTime).format('YYYY-MM-DD HH:mm:ss');
    },
    async getPostComments() {
      try {
        const response = await axiosInstance.get(`${BASE_URL}/api/comment/list/6`);
        this.postComments = response.data.result
        console.log(this.postComments);
      } catch (e) {
        console.log(e + "댓글을 불러오지 못했습니다.");
      }
    },

   
  },
  created(){
    this.getPostDetail()
    this.getPostComments()
  },
  computed: {
    renderedHtml() {
      return this.postDetail.contents;
    }
  },

}
</script>
<style>
  .date-item {
    margin-bottom: 1px; /* 원하는 간격으로 조절 */
  }
  .status {
    display: flex;
    flex-direction: row; /* 가로로 정렬 */
  }
  .status-item {
    margin-right: 10px; /* 원하는 간격으로 조절 */
  }
 
</style>
