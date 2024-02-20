<script>
import AppSidebar from "components/layout/AppSidebar.vue";
import {columns, rows} from "assets/data/SpaceTableData/forInviteMembers";
import {ref} from "vue";
import axios from "axios";

// const TOKEN = localStorage.getItem("token");
const TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsaWZlQGdhbWlsLmNvbSIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzA4NDA3MTM2LCJleHAiOjE3MDg1ODcxMzZ9.sIFpxp8qhXOqbwP5ngaCiAODee4zRZ1Ik9-vDx2f8tY";
const headers = TOKEN ? {Authorization: `Bearer ${TOKEN}`} : {};
// {headers}
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
      spaceList: Object,
    }
  },

  name: "GroupSpace",
  methods: {
    async loadSpaces(){
      console.log("start")
      const res = await axios.get("http://localhost:8080/space/spaces",{headers});
      console.log(res);
      console.log("hi")

    }
  },
  components: {AppSidebar},
  created() {
    this.loadSpaces();
  },

}
</script>


<template>
  <q-page class="sj-container">
    <div class="sj-content">
      <!-- 사이드 바 -->
      <q-table
        flat bordered
        title="SpaceList"
        :rows="rows"
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
  flex-direction: row;
  justify-content: center;
  align-items: start;
}

.spaceTable {
  width: 100%;
  background: none;
  color: orange;
  height: 5000px;
}
</style>
