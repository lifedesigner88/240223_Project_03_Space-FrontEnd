<script>
import {ref} from 'vue'

export default {
  setup() {
    const items = ref([{}, {}, {}, {}, {}, {}, {}])

    return {
      slide: ref(1),
      autoplay: ref(true),

      items,
      onLoad(index, done) {
        setTimeout(() => {
          items.value.push({}, {}, {}, {}, {}, {}, {})
          done()
        }, 2000)
      }
    }



  },

  methods: {
    openLink() {
      window.open('https://playdata.io/', '_blank');
    },


  },
}
</script>

<template>
  <q-page class="home-page">

    <!--    <q-card-section class="text-center text-white">-->
    <!--      <h3>Welcome to </h3>-->
    <!--      <h1 class="text-orange">Encore Space</h1>-->
    <!--    </q-card-section>-->

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
        @mouseleave="autoplay = true"
        style="cursor: pointer"
        @Click="openLink"
      >
        <q-carousel-slide :name="1" img-src="../../../public/image/home/encoreSpace.jpg"/>
        <q-carousel-slide :name="2" img-src="../../../public/image/home/recruit.jpg"/>
        <q-carousel-slide :name="3" img-src="../../../public/image/home/encore.jpg"/>
      </q-carousel>

      <q-img class="breathing-animation" src="../../../public/image/home/map.png" height="926" width="1920" alt=""/>

    </q-card-section>
    <q-card-section class="text-center">
      <q-infinite-scroll @load="onLoad" :offset="200">
        <div v-for="(item, index) in items" :key="index" class="caption row justify-center">
          <q-card class="my-card q-my-lg q-mx-lg" v-for="index in 2" :key="index">
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
            <q-spinner-dots color="grey" size="40px"/>
          </div>
        </template>
      </q-infinite-scroll>
    </q-card-section>
  </q-page>
</template>


<style lang="scss" scoped>
.my-card {
  width: 100%;
  max-width: 20vw;
}


@keyframes breathing {
  0% {
    opacity: 1;
    transform: scale(0.5);
  }
  50% {
    opacity: 0.0;
    transform: scale(1);
  }
  100% {
    opacity: 1;
    transform: scale(0.5);
  }
}

.breathing-animation {
  animation: breathing 20s infinite;
}

.home-page {
  width: 100vw
}
</style>
