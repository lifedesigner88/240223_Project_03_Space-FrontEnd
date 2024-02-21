<script>
import AppSidebar from "components/layout/AppSidebar.vue";
import {columns, rows} from "assets/data/SpaceTableData/forInviteMembers";
import {ref} from "vue";
import axios from "axios";
import SpaceList from "pages/space/cardList/SpaceList.vue";

// const TOKEN = localStorage.getItem("token");
const TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsaWZlQGdhbWlsLmNvbSIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzA4NDE0NDAxLCJleHAiOjE3MDg1OTQ0MDF9.J0Fz3MyjEapdIE6KjHvztF_tt9p8GDqGeiEjOC3w-aY";
const headers = TOKEN ? {Authorization: `Bearer ${TOKEN}`} : {};
const BASE_URL = "http://localhost:8080"


export default {
  setup() {
    return {
      selected: ref([]),
      columns,
      rows
    }
  },

  data() {
    return {
      mySpaceList: {},
      getMembersBySpaceId: [],
      getPostsBySpaceId: Object,
      getSpacesBySpaceId: Object,
      clickedSpaceId : 1,
      viewMembersTable: false,
      membersRows:Object,

    }
  },

  name: "GroupSpace",
  methods: {
    async loadALLSpacesByEmail() {


      try {
        const response = await axios.get(`${BASE_URL}/space/spaces`, {headers});
        this.mySpaceList = response.data.result
      } catch (e) {
        console.log(e + "모든 스페이스 가져오기 실패");
      }
    },

    async membersBySpaceId(id) {
      try {
        const response = await axios.get(`${BASE_URL}/space/${id}/members`, {headers});
        this.getMembersBySpaceId = response.data.result
        console.log(this.getMembersBySpaceId);
        this.rows = this.getMembersBySpaceId
        console.log(rows)

      } catch (e) {
        console.log(e);
      }
    },


    async postsBySpaceId() {
      try {
        const response = await axios.get(`${BASE_URL}/space/${clickedSpaceId}/posts`, {headers});
        this.getPostsBySpaceId = response.data.result
        console.log(this.mySpaceList)
        console.log("end")
      } catch (e) {
        console.log(e);
      }
    },


    async schedulesBySpaceId() {
      try {
        const response = await axios.get(`${BASE_URL}/space/${clickedSpaceId}/schedules`, {headers});
        this.getSpacesBySpaceId = response.data.result
        console.log(this.mySpaceList)
      } catch (e) {
        console.log(e);
      }
    },


    getMembersPostsSchedule(id){
      this.membersBySpaceId(id)
      // this.postsBySpaceId()
      // this.schedulesBySpaceId()
    }

  },
  components: {SpaceList, AppSidebar},
  created() {
    this.loadALLSpacesByEmail();
  },
}
</script>



<template>


  <q-page class="sj-container">
    <div class="sj-content">
      <h1 class="hi">{{ clickedSpaceId }}</h1>

      <SpaceList
        :mySpaceList="mySpaceList"
        @getClickedSpaceId="getMembersPostsSchedule($event)"
      />

      <q-table
        flat bordered
        title="맴버리스트"
        :rows="getMembersBySpaceId"
        :columns="columns"
        row-key="name"
        selection="multiple"
        v-model:selected="selected"
        class="spaceTable"
      >
        <template v-slot:body-selection="scope">
          <q-toggle v-model="scope.selected"/>
        </template>
      </q-table>

    </div>
  </q-page>
  <AppSidebar></AppSidebar>
</template>

<style scoped>

.sj-container {
  width: 100vw;
  //background-color: red;
  display: grid;
  grid-template-columns: 2.7fr 8fr 1.2fr;
}

.sj-content {
  box-sizing: border-box;
  padding-top: 8vh;;
  //background-color: gray;
  width: 100%;
  height: 100%;
  grid-column-start: 2;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
}

.spaceTable {
  width: 100%;
  background: none;
  color: orange;
  height: 5000px;
}
.hi{
  font-size: 20px;
  color: white;
}

</style>
