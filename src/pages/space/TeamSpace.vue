<script>
import AppSidebar from "components/layout/AppSidebar.vue";
import {columns, rows} from "assets/data/SpaceTableData/forInviteMembers";
import {ref} from "vue";
import axios from "axios";
import SpaceList from "pages/space/cardList/SpaceList.vue";
import {jwtDecode} from "jwt-decode";

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
      clickedSpaceId: 1,
      viewMembersTable: false,
      membersRows: Object,

      dialog: false,
      spaceName: '',
      description: '',

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
        this.rows = this.getMembersBySpaceId
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


    getMembersPostsSchedule(id) {
      this.viewMembersTable = true
      this.membersBySpaceId(id)
      console.log(this.selected)
      // this.postsBySpaceId()
      // this.schedulesBySpaceId()
    },

    async createTeamSpace() {

      const email = jwtDecode(TOKEN).sub;
      try {
        let members = this.selected
          .filter(obj => obj.email !== email)
          .map(obj => {
            return {
              memberEmail: obj.email,
              spaceRole: "CREW"
            }
          })

        members = [...members, {memberEmail: email, spaceRole: "CAPTAIN"}]
        const postData = {
          "spaceName" : this.spaceName,
          "description": this.description,
          "spaceThumbNailPath" : "https://picsum.photos/2",
          "spaceMembers": members
        }

        try {
          const response = await axios.post(`${BASE_URL}/space/create/team`, postData, {headers});
          // window.location.reload();
        } catch (e) {
          console.log(e);
        }

        try {
          const response = await axios.get(`${BASE_URL}/space/spaces`, {headers});
          this.mySpaceList = response.data.result
        } catch (e) {
          console.log(e + "모든 스페이스 가져오기 실패");
        }

      } catch (e) {
        console.log(e)
      }
    }


  },
  components: {SpaceList, AppSidebar},
  created() {
    this.loadALLSpacesByEmail();
  },
}
</script>

<template>
  <q-dialog v-model="dialog">
    <q-card>
      <q-card-section>
        <q-input outlined v-model="spaceName" label="팀 스페이스 제목" />
        <q-input outlined v-model="description" label="간단한 설명" />
      </q-card-section>
      <q-card-actions>
        <q-btn flat label="Cancel" color="primary" v-close-popup />
        <q-btn flat label="Submit" color="primary" v-close-popup @click="createTeamSpace" />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <q-page class="sj-container">
    <div class="sj-content">

      <q-table
        v-if="viewMembersTable"
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

      <SpaceList
        :mySpaceList="mySpaceList"
        @getClickedSpaceId="getMembersPostsSchedule($event)"
        @createTeamSpace=" dialog=true"
      />


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
  padding-top: 4vh;;
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
}

.hi {
  font-size: 20px;
  color: white;
}

</style>
