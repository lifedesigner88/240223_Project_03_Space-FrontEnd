<template>
  <q-page class="GroupSpace row container">
    <!-- 사이드 바 -->
    <AppSidebar ></AppSidebar>

    <q-item-section>
      <div class="text-white text-center">
        <h1>GroupSpace</h1>
      </div>
    </q-item-section>
  </q-page>
</template>

<script>
import AppSidebar from "components/layout/AppSidebar.vue";

export default {
  name: "GroupSpace",
  components: {AppSidebar}
}
</script>

<style scoped>

</style>
