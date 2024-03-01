<template>


  <q-page>
    <q-form @submit="onSubmit" class="q-gutter-md">
      <q-input outlined v-model="name" label="Name"/>
      <q-input outlined v-model="email" label="Email"/>
      <!-- 필요한 만큼의 입력 필드를 추가합니다 -->
      <q-btn label="Submit" type="submit" color="primary"/>
    </q-form>

    <q-item-section class="for_flex">
      <div class="container__in">
        <div class="myPage-header">
          <span>My Info</span>
          <q-card-actions>
            <q-btn class="btn__style" label="수정" color="green-5"/>
            <q-btn class="btn__style" label="탈퇴" color="red-5" @click="deleteMember"/>
          </q-card-actions>
        </div>
        <table class="table">
          <tr>
            <th>Profile :</th>
            <td><img class="profile__box" :src="myInfo.profile" alt=""/></td>
          </tr>
          <tr>
            <th>Name :</th>
            <td>{{ myInfo.name }}</td>
          </tr>
          <tr>
            <th>Nick Name :</th>
            <td>{{ myInfo.nickname }}</td>
          </tr>
          <tr>
            <th>Email :</th>
            <td>{{ myInfo.email }}</td>
          </tr>
          <tr>
            <th>Role :</th>
            <td>{{ myInfo.role }}</td>
          </tr>
          <tr>
            <th>loginType :</th>
            <td>{{ myInfo.loginType }}</td>
          </tr>
        </table>
      </div>
    </q-item-section>
  </q-page>
  <AppSidebar></AppSidebar>
</template>

<script>
import AppSidebar from "components/layout/AppSidebar.vue";
import {axiosInstance} from "boot/axios";
import {Logout} from "src/services/authService";

const BASE_URL = "http://localhost:8080"

export default {
  components: {AppSidebar},
  setup() {
    return {}
  },

  data() {
    return {
      myInfo: {},
    }
  },

  methods: {
    async loadMyInfo() {
      try {
        const response = await axiosInstance.get(`${BASE_URL}/api/member/mypage`);
        this.myInfo = response.data.result
      } catch (e) {
        console.log(e + "모든 스페이스 가져오기 실패");
      }
    },
    async deleteMember() {
      if (confirm("모든 활동이 삭제됩니다 동의하십니까?"))
        try {
          const response = await axiosInstance.get(`${BASE_URL}/api/member/delete`)
          console.log(response.data.result)
          Logout(this.$q)
        } catch (e) {
          console.log(e + "회원 정보 삭제 실패")
        }
    },
  },
  created() {
    this.loadMyInfo();
  }
}
</script>

<style lang="scss" scoped>

.btn__style {
  font-size: 20px;
  padding: 5px 20px 0 20px;
  font-weight: bold;

}

.container__in {
  height: 60vh;
  //background-color: gray;
  color: orange;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  //padding-right: 50vh;
  padding-bottom: 20vh;
}


.myPage-header {
  //background-color: gray;
  display: flex;
  justify-content: space-around;
  font-size: 3vw;
  margin-top: 10vw;
}

.table {
  font-size: 30px;
  height: 70%;
  padding: 30px;
}

.for_flex {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

th {
  padding: 10px;
}

td {
  color: #98dad1;
}

.profile__box {
  border-radius: 10px;
  width: 288px;
  height: 288px;
}
</style>
