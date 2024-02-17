<template>
  <q-page class="home-page">

    <q-card-section class="text-center">
      <h2>Welcome to Encore Space</h2>
    </q-card-section>

    <q-card-section class="text-center q-ma-lg-lg">
        <q-carousel
          animated
          v-model="slide"
          navigation
          infinite
          :autoplay="autoplay"
          arrows
          transition-prev="slide-right"
          transition-next="slide-left"
          @mouseenter="autoplay = false"
          @mouseleave="autoplay = true"
        >
          <q-carousel-slide :name="1" img-src="https://cdn.quasar.dev/img/mountains.jpg" />
          <q-carousel-slide :name="2" img-src="https://cdn.quasar.dev/img/parallax1.jpg" />
          <q-carousel-slide :name="3" img-src="https://cdn.quasar.dev/img/parallax2.jpg" />
        </q-carousel>

    </q-card-section>


    <q-card-section class="text-center">
    <div class="q-pa-md">
      <div class="q-gutter-md col text-center items-start">
        <q-img class="q-my-lg-xl" src="image/home/main_img_1.png" alt="Main Image1"  style="height: 50%; max-width: 50%"/>
        <q-img class="q-my-lg-xl" src="image/home/main_img_2.png" alt="Main Image1"  style="height: 50%; max-width: 50%"/>
        <q-img class="q-my-lg-xl" src="image/home/main_img_3.png" alt="Main Image1"  style="height: 50%; max-width: 50%"/>
      </div>
    </div>
    </q-card-section>



    <q-card-section class="text-center">
      <q-infinite-scroll @load="onLoad" :offset="250">
        <div v-for="(item, index) in items" :key="index" class="caption row justify-center">
          <q-card class="my-card q-my-lg q-mx-lg"  v-for="index in 2" :key="index">
            <q-img src="https://cdn.quasar.dev/img/parallax2.jpg">
              <div class="absolute-bottom text-h6">
                제목
              </div>
            </q-img>

            <q-card-section>
              <p>대충 내용</p>
            </q-card-section>
          </q-card>
        </div>
        <template v-slot:loading>
          <div class="row justify-center q-my-md">
            <q-spinner-dots color="grey" size="40px" />
          </div>
        </template>
      </q-infinite-scroll>
    </q-card-section>
  </q-page>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    const items = ref([ {}, {}, {}, {}, {}, {}, {} ])

    return {
      slide: ref(1),
      autoplay: ref(true),

      items,
      onLoad (index, done) {
        setTimeout(() => {
          items.value.push({}, {}, {}, {}, {}, {}, {})
          done()
        }, 2000)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.my-card{
  width: 100%;
  max-width: 20vw;
}

</style>
