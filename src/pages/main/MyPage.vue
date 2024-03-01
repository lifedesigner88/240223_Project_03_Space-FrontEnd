<template>
  <q-page>
    <q-item-section class="for_flex">
      <div class="container__in">
        <div class="myPage-header">
          <span>My Info</span>
          <q-card-actions class="botton__box">
            <q-btn class="btn__style" label="수정" color="green-5" @click="patchMyInfo"/>
            <q-btn class="btn__style" label="탈퇴" color="red-5" @click="deleteMember"/>
          </q-card-actions>
        </div>
        <table class="table">
          <tr>
            <th>Profile :</th>
            <td>
              <img v-if="myInfo.profile && myInfo.profile.startsWith('http')" class="profile__box" :src="myInfo.profile"
                   alt=""/>
              <img v-else class="profile__box" :src="getProfileImage(myInfo.email)" alt=""/>
              <input type="file" ref="fileInput" @change="updateProfile" style="display: none"/>
              <q-btn class="btn__style profile__btn" label="사진수정" color="blue-5" @click="promptFileUpload"/>
            </td>
          </tr>
          <tr>
            <th>Name :</th>
            <td>
              <q-input class="input__box" bg-color="orange-3" outlined label-color="red-4" :label="myInfo.name"
                       v-model="name"/>
            </td>
          </tr>
          <tr>
            <th>Nick Name :</th>
            <td>
              <q-input class="input__box" bg-color="orange-3" outlined label-color="red-4" :label="myInfo.nickname"
                       v-model="nickname"/>
            </td>
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
      name: "",
      nickname: "",
      profile: null,
    }
  },

  methods: {

    getProfileImage(email){
      return `${BASE_URL}/api/member/profile/image/${email}`
    },

    promptFileUpload() {
      this.$refs.fileInput.click();
    },

    async updateProfile(event) {
      this.profile = event.target.files[0];
      const formData = new FormData();
      formData.append('profile', this.profile)

      if (confirm("등록하신 사진으로 즉시 프로필이 변경됩니다. 변경하시겠습니까?"))
      try {
        await axiosInstance.put(`${BASE_URL}/api/member/profile`, formData)
        window.location.reload();
      } catch (e) {
        console.log(e + "프로필 수정 실패");
      }
    },

    async loadMyInfo() {
      try {
        const response = await axiosInstance.get(`${BASE_URL}/api/member/mypage`);
        this.myInfo = response.data.result
        this.name = this.myInfo.name;
        this.nickname = this.myInfo.nickname;
      } catch (e) {
        console.log(e + "모든 스페이스 가져오기 실패");
      }
    },

    async patchMyInfo() {
      if (this.myInfo.name === this.name && this.myInfo.nickname === this.nickname)
        alert("이름과 닉네임의 변경사항이 없습니다.")
      else if (confirm("입력하신 정보로 수정하시겠습니까?"))
        try {
          const response = await axiosInstance.patch(`${BASE_URL}/api/member/patch`, {
            name: this.name,
            nickname: this.nickname
          })
          alert("수정완료")
          await this.loadMyInfo();
        } catch (e) {
          console.log(e + "회원정보 수정 실패")
        }
    },


    async deleteMember() {
      if (confirm("모든 활동이 삭제됩니다 동의하십니까?"))
        try {
          await axiosInstance.delete(`${BASE_URL}/api/member/delete`)
          Logout(this.$q)
        } catch (e) {
          console.log(e + "회원 정보 삭제 실패")
        }
    },
  },
  created() {
    this.loadMyInfo();
  },
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
  font-size: 4vw;
  margin-top: 50vh;
  margin-bottom: 20px;
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
  //background-color: gray;

}

th {
  padding: 15px;
}

td {
  color: #98dad1;
}

.profile__box {
  border-radius: 10px;
  width: 288px;
  height: 288px;
}

.input__box {
  font-weight: bold;
  font-size: 28px;
  width: 100%;
  color: #98dad1;
}

.profile__btn {
  margin-left: 20px;
  margin-bottom: 40px;
}

.botton__box {
  width: 200px;
  display: flex;
  justify-content: space-between;
}
</style>
