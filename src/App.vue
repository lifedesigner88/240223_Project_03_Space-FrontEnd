<template>
  <q-layout>
    <!-- 헤더 -->
    <AppHeader></AppHeader>

    <!-- 사이드바 (옵션) -->
    <q-drawer>
      사이드바 내용
    </q-drawer>

    <!-- 페이지 컨텐츠 -->
    <q-page-container>
       페이지 내용
    </q-page-container>
  </q-layout>
</template>

<script>
import AppHeader from "components/layout/AppHeader.vue";

export default {
  components: {AppHeader},
  setup () {
    return {

    }
  }
}
</script>

