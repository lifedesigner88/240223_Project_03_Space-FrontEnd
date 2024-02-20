<template>
  <q-page class="MessagesPage row container">
    <!-- 사이드 바 -->
    <AppSidebar ></AppSidebar>

    <q-item-section>
      <div class="text-center">

        <div class="WAL position-relative bg-grey-4 size" :style="style">
          <q-layout view="lHh Lpr lFf" class="WAL__layout shadow-3" container>
            <q-header elevated>
              <q-toolbar class="bg-grey-3 text-black">
                <q-btn
                  round
                  flat
                  icon="keyboard_arrow_left"
                  class="WAL__drawer-open q-mr-sm"
                  @click="toggleLeftDrawer"
                />

                <q-btn round flat>
                  <q-avatar>
<!--                    <img :src="currentConversation.avatar">-->
                  </q-avatar>
                </q-btn>

                <span class="q-subtitle-1 q-pl-md">
<!--            {{ currentConversation.person }}-->
                </span>

                <q-space/>

                <q-btn round flat icon="search" />
                <q-btn round flat>
                  <q-icon name="attachment" class="rotate-135" />
                </q-btn>
                <q-btn round flat icon="more_vert">
                  <q-menu auto-close :offset="[110, 0]">
                    <q-list style="min-width: 150px">
                      <q-item clickable>
                        <q-item-section>Contact data</q-item-section>
                      </q-item>
                      <q-item clickable>
                        <q-item-section>Block</q-item-section>
                      </q-item>
                      <q-item clickable>
                        <q-item-section>Select messages</q-item-section>
                      </q-item>
                      <q-item clickable>
                        <q-item-section>Silence</q-item-section>
                      </q-item>
                      <q-item clickable>
                        <q-item-section>Clear messages</q-item-section>
                      </q-item>
                      <q-item clickable>
                        <q-item-section>Erase messages</q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn>
              </q-toolbar>
            </q-header>

            <q-drawer
              v-model="leftDrawerOpen"
              show-if-above
              bordered
              :breakpoint="690"
            >
              <q-toolbar class="bg-grey-3">
                <q-avatar class="cursor-pointer">
                  <img src="https://cdn.quasar.dev/logo-v2/svg/logo.svg" />
                </q-avatar>

                <q-space />

<!--                전송버튼은 여기야!-->
                <q-btn round flat icon="message" @click="prompt = true"/>
                <q-dialog v-model="prompt" persistent>
                  <q-card style="min-width: 350px">
                    <q-card-section>
                      <div class="text-h6">생성할 채팅방의 이름</div>
                    </q-card-section>

                    <q-card-section class="q-pt-none">
                      <q-input dense v-model="roomName" autofocus @keyup.enter="createRoom" />
                    </q-card-section>

                    <q-card-actions align="right" class="text-primary">
                      <q-btn flat label="취소" v-close-popup />
                      <q-btn flat label="채팅방 생성" v-close-popup @click="createRoom"/>
                    </q-card-actions>
                  </q-card>
                </q-dialog>
                <q-btn round flat icon="more_vert">
                  <q-menu auto-close :offset="[110, 8]">
                    <q-list style="min-width: 150px">
                      <q-item clickable>
                        <q-item-section>New group</q-item-section>
                      </q-item>
                      <q-item clickable>
                        <q-item-section>Profile</q-item-section>
                      </q-item>
                      <q-item clickable>
                        <q-item-section>Archived</q-item-section>
                      </q-item>
                      <q-item clickable>
                        <q-item-section>Favorites</q-item-section>
                      </q-item>
                      <q-item clickable>
                        <q-item-section>Settings</q-item-section>
                      </q-item>
                      <q-item clickable>
                        <q-item-section>Logout</q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn>

                <q-btn
                  round
                  flat
                  icon="close"
                  class="WAL__drawer-close"
                  @click="toggleLeftDrawer"
                />
              </q-toolbar>

              <q-toolbar class="bg-grey-2">
                <q-input rounded outlined dense class="WAL__field full-width" bg-color="white" v-model="search" placeholder="Search or start a new conversation">
                  <template v-slot:prepend>
                    <q-icon name="search" />
                  </template>
                </q-input>
              </q-toolbar>

<!--              여기서 채팅방 검색 -->
              <q-scroll-area style="height: calc(100% - 100px)">
                <q-list>
                  <q-item
                    v-for="chatRoom in chatRoomList"
                    :key="chatRoom.id"
                    clickable
                    v-ripple
                    @click="console.log('hi')"
                  >
                    <q-item-section avatar>
                      <q-avatar>
                        <img :src="chatRoom.avatar">
                      </q-avatar>
                    </q-item-section>

                    <q-item-section>
                      <q-item-label lines="1">
                        {{ chatRoom.name }}
                      </q-item-label>
                      <q-item-label class="conversation__summary" caption>
                        {{ chatRoom.host }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-scroll-area>
            </q-drawer>

            <q-page-container class="bg-grey-2">
              <router-view />
            </q-page-container>

            <q-footer>
              <q-toolbar class="bg-grey-3 text-black row">
                <q-btn round flat icon="insert_emoticon" class="q-mr-sm" />
                <q-input rounded outlined dense class="WAL__field col-grow q-mr-sm" bg-color="white" v-model="message" placeholder="Type a message" />
                <q-btn round flat icon="mic" />
              </q-toolbar>
            </q-footer>
          </q-layout>
        </div>

      </div>
    </q-item-section>
  </q-page>
</template>

<script>
import axios from 'axios';
// import websocket from 'ws';
import AppSidebar from "components/layout/AppSidebar.vue";
import { useQuasar } from 'quasar'
import { ref, computed } from 'vue'
const TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0dHViaUBnbWFpbC5jb20iLCJyb2xlIjoiVVNFUiIsImlhdCI6MTcwODQ1MDk1MSwiZXhwIjoxNzA4NDUyNzUxfQ.8V5nLy9VFvCFuWPgoLNSDbsLLO7bn3x3oPgoNc7yrTg";
const headers = TOKEN ? {Authorization: `Bearer ${TOKEN}`} : {};

export default {
  name: "MessagesPage",
  components: {AppSidebar},

  data() {
    return {
      chatRoomList: [],
      pageSize: 5,
      currentPage: 0,
      searchType: 'name',
      searchValue: '',
      isLastPage: false,
      isLoading: false,
    }
  },

  setup () {
    const $q = useQuasar()

    const leftDrawerOpen = ref(false)
    const search = ref('')
    const message = ref('')
    const style = computed(() => ({
      height: $q.screen.height + 'px'
    }))
    const roomName = ref('')

    function toggleLeftDrawer () {
      leftDrawerOpen.value = !leftDrawerOpen.value
    }

    async function createRoom() {
      console.log(roomName.value)
      if (roomName.value) {
        const response = await axios.post('http://localhost:8080/chat/room' + roomName.value, {headers})
        console.log(response.data);
        if (response.data) {
          this.chatRoomList.push(response.data)
          roomName.value = ''
          this.prompt = false
        }
      } else {
        console.log("Please enter the room name.")
      }
    }

    return {
      leftDrawerOpen,
      search,
      message,
      style,
      roomName,
      prompt: ref(false),
      toggleLeftDrawer,
      createRoom
    }
  },

  created() {
    this.loadChatRooms();
  },

  mounted() {
    // scroll 동작이 발생할 때마다 scrollPagination 함수 호출된다는 의미
    window.addEventListener('scroll', this.scrollPagination);
  },

  methods: {
    scrollPagination() {
      // innerHeight : 브라우저 창의 내부높이를 픽셀단위로 변환
      // scrollY : 스크롤을 통해 Y축을 이동한 거리
      // offsetHeight : 전체 브라우저 창의 높이
      const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 500;
      if (nearBottom && !this.isLastPage && !this.isLoading) {
        this.currentPage++;
        this.loadChatRooms();
      }
    },

    searchChatRooms() {
      this.chatRoomList = [];
      this.currentPage = 0;
      this.isLastPage = false;
      this.loadChatRooms();
    },

    async loadChatRooms() {
      this.isLoading = true;
      try {
        const params = {
          page: this.currentPage,
          size: this.pageSize,
          [this.searchType]: this.searchValue,
        }
        console.log(params);

        const response = await axios.get(
          `http://localhost:8080/chat/rooms`, {headers});
        console.log(response.data.result);
        const additionalChatRoomList = response.data.result;
        this.chatRoomList = additionalChatRoomList;
      } catch(error) {
        console.log(error);
      }
      this.isLoading = false;
    },
  },

}
</script>


<style lang="sass">


.WAL
  width: 100%
  height: 50%
  padding-top: 20px
  padding-bottom: 20px

  //&:before
  //  content: ''
  //  height: 127px
  //  position: fixed
  //  top: 0
  //  width: 100%
  //  background-color: #009688

  &__layout
    margin: 0 auto
    z-index: 4000
    height: 80%
    width: 100%
    max-width: 950px
    border-radius: 5px

  &__field.q-field--outlined .q-field__control:before
    border: none

  .q-drawer--standard
    .WAL__drawer-close
      display: none

@media (max-width: 850px)
  .WAL
    padding: 0
    &__layout
      width: 100%
      border-radius: 0

@media (min-width: 691px)
  .WAL
    &__drawer-open
      display: none

.conversation__summary
  margin-top: 4px

.conversation__more
  margin-top: 0!important
  font-size: 1.4rem
</style>
