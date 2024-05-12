<template>
  <q-page>
    <q-item-section class="for_flex">
      <q-dialog v-model="dialog">
        <q-card class="card-size">
          <q-card-section class="passInput__box">
            <q-input
              dark
              v-model="password"
              rounded
              type="password"
              label="비밀번호"
              label-color="blue"
              class="input__size"
              @keyup="validatePassword"
            />
            <q-input
              dark
              v-model="passwordCheck"
              rounded
              type="password"
              label="비밀번호 확인"
              label-color="blue"
              class="input__size"
              @keyup="validatePasswordCheck"
            />
            <div class="error_message">{{ errorMessage }}</div>
          </q-card-section>
          <q-card-actions>
            <q-btn flat class="button--size" label="Cancel" color="primary" v-close-popup/>
            <q-btn flat class="button--size" label="Submit" color="primary" @click="updatePassword"/>
          </q-card-actions>
        </q-card>
      </q-dialog>

      <div class="container__in">
        <div class="myPage-header">
          <span>My Info</span>

          <q-card-actions>
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
            <td>
              <q-btn class="btn__style"  style="margin-left: 15px" label="정보수정" color="green-5" @click="patchMyInfo"/>
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
            <td>
              {{ myInfo.loginType }}
            </td>
              <td>
                <q-btn class="btn__style pass__box" label="비밀번호 변경" color="orange" @click="dialog=true"/>
              </td>
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
import {isValidPassword} from "src/services/utilityService";
import {triggerNegative} from "src/utils/notification";

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

      dialog: false,
      password: '',
      passwordCheck: '',
      errorMessage: '',

    }
  },

  methods: {
    getProfileImage(email){
      return `${BASE_URL}/api/member/profile/image/${email}`
    },

    promptFileUpload() {
      this.$refs.fileInput.click();
    },
    validatePassword() {
      if (!isValidPassword(this.password)) {
        this.errorMessage = '비밀번호는 최소 8자 이상, 15자 이하의 숫자를 입력하세요. 알파벳 대소문자(a~z, A~Z), 숫자(0~9)가 혼합되어야 합니다.';
      } else {
        this.errorMessage = '';
      }
    },

    validatePasswordCheck() {
      if (this.password !== this.passwordCheck) {
        this.errorMessage = '비밀번호가 서로 일치하지 않습니다.';
      } else {
        this.errorMessage = '서로 일치합니다.';
      }
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

          await axiosInstance.patch(`${BASE_URL}/api/member/patch`, {
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

    async updatePassword() {
      if (!isValidPassword(this.password)) {
        this.errorMessage = '비밀번호 형식이 잘못 되었습니다.';
        triggerNegative(this.errorMessage, this.$q);
        return;
      }

      if (this.password !== this.passwordCheck) {
        this.errorMessage = '비밀번호가 서로 다릅니다.';
        triggerNegative(this.errorMessage, this.$q);
        return;
      }

      if (confirm("비밀번호가 즉시 변경됩니다")) {
       try {
         await axiosInstance.patch(`${BASE_URL}/api/member/password`, {
           password: this.password,
         })
       } catch (e) {
         console.log(e + "비밀번호 변경 실패")
       }
      }
      this.dialog=false
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
  display: flex;
  justify-content: space-between;
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

.card-size {
  width: 50vw;
  background-color: #f1cc85;
  padding: 2vw;
  border-radius: 20px;

}
.input__size {
  font-size: 35px;
  font-weight: bold;
}
.button--size{
  font-size: 50px;
}

.error_message {
  height:8vh;
  font-size:18px;
  font-weight: normal;
  color: #4d4de3;
  padding: 14px;
}

.passInput__box {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 30vh;
}
</style>
