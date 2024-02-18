<template>
  <q-layout view="lHh Lpr lFf" class="background-image" >

    <!-- 헤더 -->
    <AppHeader></AppHeader>
    <!--    <q-pull-to-refresh @refresh="refresh">-->
    <q-scroll-area
      :thumb-style="thumbStyle"
      style="height: 100vh; max-width: 100vw;">

      <!-- 페이지 컨텐츠 -->
      <q-page-container>
         <router-view/>
      </q-page-container>


    <!--    </q-pull-to-refresh>-->
    </q-scroll-area>
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
      thumbStyle: {
        right: '4px',
        borderRadius: '5px',
        backgroundColor: '#ff9800',
        width: '5px',
        opacity: 0.75
      },
    }
  }
}

</script>


