<template>
  <q-list >
    <q-item >
      <q-item-section>
        <q-input class="search " dense rounded standout placeholder="Email..."   v-model=email />
      </q-item-section>
    </q-item>
    <q-item >
      <q-item-section>
        <q-input class="search " type="password" dense rounded standout placeholder="Password"  v-model=password />
      </q-item-section>
    </q-item>
    <q-item >
      <q-item-section>
        <q-btn class="bg-orange text-white" @click=login flat>Login</q-btn>
      </q-item-section>
    </q-item>
    <q-item >
      <q-item-section>
        <q-btn class="bg-red-7 text-white" flat @click="googleApi()"> <q-icon class="q-mr-sm" size="1em" name="fa-brands fa-google"/> Google Login </q-btn>
      </q-item-section>
    </q-item>
    <q-item >
      <q-item-section>
        <q-btn class="bg-black text-white" flat  @click="githubApi()"><q-icon class="q-mr-sm" size="1em" name="fa-brands fa-github"/> Github Login  </q-btn>
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
import {githubApi, googleApi} from "src/services/authService";
export default {
  data() {
    return {
      email: '',
      password: '',
    }
  }
  ,
  methods:{
    googleApi,
    githubApi

  }
}
</script>

<style scoped>

</style>
