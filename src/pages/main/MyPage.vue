<template>
  <q-page class="my-page row container">
    <!-- 사이드 바 -->
    <AppSidebar class="fixed-sidebar"></AppSidebar>

    <q-item-section>
    <div class="text-white text-center">
      <h1>MY-PAGE</h1>
    </div>
    </q-item-section>
  </q-page>
</template>

<script>
import AppSidebar from "components/layout/AppSidebar.vue";

export default {
  components: {AppSidebar},
  setup() {


    return {}
  }
}
</script>

<style lang="scss" scoped>

</style>
