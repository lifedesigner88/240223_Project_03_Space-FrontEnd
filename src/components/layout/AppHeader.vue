<template>
  <q-header class="top-navbar bg-white row justify-between q-ma-auto">
    <div class="text-black q-mx-lg q-my-auto">
      <q-btn class=" home text-center" size="2em" flat label="encore SPACE"></q-btn>
    </div>
    <div class="text-grey-8 row q-mx-lg q-my-auto">

      <q-input class="search q-my-auto q-mx-lg-xl" dense rounded standout placeholder="Search..."   model-value="" >
        <template v-slot:append>
          <q-icon  name="search" />
        </template>
      </q-input>
      <q-icon class="q-mx-lg" size="3em" name="notifications"></q-icon>

      <q-icon class="q-mx-auto" size="3em" name="mail"></q-icon>

      <q-icon class="q-mx-lg" size="2.7em" name="fas fa-calendar"></q-icon>

      <q-btn flat rounded class="bg-grey-3 text-black" label="Login">
        <q-menu class="q-my-lg-lg">
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
                <q-btn class="bg-indigo text-white" flat>Login</q-btn>
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
        </q-menu>
      </q-btn>

      <q-btn flat rounded class="bg-grey-3 text-black" label="Menu">
        <q-menu>
          <q-list >
            <q-item clickable>
              <q-item-section>My Page</q-item-section>
            </q-item>

            <q-item clickable>
              <q-item-section>My SPACE</q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section>Team SPACE</q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section>Group SPACE</q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section>Kanban</q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section>Calendar</q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section>MessagesPage</q-item-section>
            </q-item>

            <q-item clickable>
              <q-item-section>Settings</q-item-section>
            </q-item>

            <q-item clickable>
              <q-item-section>Log Out</q-item-section>
            </q-item>

          </q-list>
        </q-menu>
      </q-btn>
    </div>
  </q-header>
</template>

<script>
// 애플리케이션의 상단에 표시되는 헤더 컴포넌트로, 로고나 네비게이션 메뉴와 같은 요소
import {ref} from "vue";

export default {
  name: 'AppHeader'
  ,
  setup () {
    return {
      showing: ref(false)
    }
  }
}
</script>


