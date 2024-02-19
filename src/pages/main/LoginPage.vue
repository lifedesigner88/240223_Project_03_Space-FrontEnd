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
        <q-btn class="bg-red-7 text-white" flat> <q-icon class="q-mr-sm" size="1em" name="fa-brands fa-google"/> Google Login </q-btn>
      </q-item-section>
    </q-item>
    <q-item >
      <q-item-section>
        <q-btn class="bg-black text-white" flat><q-icon class="q-mr-sm" size="1em" name="fa-brands fa-github"/> Github Login  </q-btn>
      </q-item-section>
    </q-item>
    <q-item >
      <q-item-section>
        <q-btn class="bg-grey-7 text-white" flat>Email Register</q-btn>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
export default {
  name: "LoginPage",

  methods:{

  }
}
</script>

<style scoped>

</style>
