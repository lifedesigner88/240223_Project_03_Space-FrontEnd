<template>
  <q-page class="my-register container row  justify-center align-center">


      <q-card-section class="text-center" style="width: 25vw; top: 10vh">

        <div class="text-center" >
          <h5 class="text-orange">Email Register</h5>
          <div>
          <q-input
            dark
            v-model="email"
            rounded
            type="email"
            label="이메일"
            label-color="orange"
            class="q-mb-sm"
          />
          </div>
          <q-input
            dark
            v-model="name"
            label="이름"
            label-color="orange"
            color="white"
            class="q-mb-sm"
          />
          <q-input
            dark
            v-model="nickname"
            rounded
            label="닉네임"
            label-color="orange"
            class="q-mb-sm"
          />
          <q-input
            dark
            v-model="password"
            rounded
            type="password"
            label="비밀번호"
            label-color="orange"
            class="q-mb-sm"
          />
          <q-input
            dark
            v-model="passwordCheck"
            rounded
            type="password"
            label="비밀번호 확인"
            label-color="orange"
            class="q-mb-sm"
          />

          <div class="q-mt-lg">
            <q-btn label="회원가입" type="submit" @click="register" class="text-black bg-white" style="opacity: 0.8" />
          </div>
        </div>
      </q-card-section>


  </q-page>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      passwordCheck: '',
      nickname: '',

    }
  },
  methods: {
    register() {
      const formData = {
        name: this.name,
        email: this.email,
        password: this.password,
        nickname: this.nickname,
        loginType: "EMAIL"
      };

      axios.post('http://localhost:8080/api/member/create', formData)
        .then(response => {
          console.log(response.data);
          // 회원가입 성공 시 처리할 내용 추가
        })
        .catch(error => {
          console.error(error);
          // 회원가입 실패 시 처리할 내용 추가
        });
    }
  }
  ,
  setup() {


    return {}
  }
}
</script>

<style lang="scss" scoped>
</style>
