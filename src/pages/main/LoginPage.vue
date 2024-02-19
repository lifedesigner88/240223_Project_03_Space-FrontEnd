<template>
  <q-list >
    <q-item >
      <q-item-section>
        <q-input class="search " dense rounded standout placeholder="Email..."   model-value="" />
      </q-item-section>
    </q-item>
    <q-item >
      <q-item-section>
        <q-input class="search " dense rounded standout placeholder="Password"   model-value="" />
      </q-item-section>
    </q-item>
    <q-item >
      <q-item-section>
        <q-btn class="bg-orange text-white" flat>Login</q-btn>
      </q-item-section>
    </q-item>
    <q-item >
      <q-item-section>
        <q-btn class="bg-red-7 text-white" flat> <q-icon class="q-mr-sm" size="1em" name="fa-brands fa-google" @click="google"/> Google Login </q-btn>
      </q-item-section>
    </q-item>
    <q-item >
      <q-item-section>
        <q-btn class="bg-black text-white" flat><q-icon class="q-mr-sm" size="1em" name="fa-brands fa-github" @click="github"/> Github Login  </q-btn>
      </q-item-section>
    </q-item>
    <q-item >
      <q-item-section>
        <q-btn class="bg-grey-7 text-white" flat @click="this.$router.push('/Register')">Email Register</q-btn>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
import axios from "axios";
import {useQuasar} from "quasar";
import { ref } from 'vue';
export default {
  name: "LoginPage"
  ,
  setup() {
    const $q = useQuasar();

    function triggerOngoing() {
      $q.notify({
        type: 'positive',
        message: '로그인되었습니다.',
        timeout: 1000
      });
    }

    function triggerNegative(message) {
      $q.notify({
        type: 'warning',
        position: 'top',
        message: message
      });
    }

    function github(){
      console.table('깃허브야')
      axios.get('http://localhost:8080/oauth2/authorization/github')
        .then(response => {
          console.table(response)
          triggerOngoing();
          // this.$router.push('/');
        })
        .catch(error => {
          triggerNegative(error.response.data.message);
        });
    }
    function google(){
      console.table('구글이야')
      axios.get('http://localhost:8080/oauth2/authorization/google')
        .then(response => {
          console.table(response)
          triggerOngoing();
          // this.$router.push('/');
        })
        .catch(error => {
          triggerNegative(error.response.data.message);
        });
    }

    return{
      triggerOngoing,
      triggerNegative,
      google,
      github
    }
  }
  ,
  methods:{

  }
}
</script>

<style scoped>

</style>
