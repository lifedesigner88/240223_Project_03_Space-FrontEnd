<template>
  <q-layout view="lHh Lpr lFf">
<!--    <q-pull-to-refresh @refresh="refresh">-->
      <q-scroll-area style="height: 100vh; max-width: 100vw;">
      <!-- 헤더 -->
      <AppHeader></AppHeader>

      <!-- 페이지 컨텐츠 -->
      <q-page-container>
         <router-view/>
      </q-page-container>
      </q-scroll-area>
<!--    </q-pull-to-refresh>-->
  </q-layout>
</template>

<script>
import AppHeader from "components/layout/AppHeader.vue";
import {refresh} from "ionicons/icons";

export default {
  components: {AppHeader},
  setup() {
    return {
      // refresh () {
      //   location.reload();
      // }
    }
  }
}

</script>

