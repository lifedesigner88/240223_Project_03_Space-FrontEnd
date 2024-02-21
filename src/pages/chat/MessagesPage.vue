<template>
  <q-page class="MessagesPage row container">
    <!-- 사이드 바 -->
    <AppSidebar></AppSidebar>

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

                <q-btn round flat icon="search"/>
                <q-btn round flat>
                  <q-icon name="attachment" class="rotate-135"/>
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
                  <img src="https://cdn.quasar.dev/logo-v2/svg/logo.svg"/>
                </q-avatar>

                <q-space/>

                <!--                전송버튼은 여기야!-->
                <q-btn round flat icon="message" @click="prompt = true"/>
                <q-dialog v-model="prompt" persistent>
                  <q-card style="min-width: 350px">
                    <q-card-section>
                      <div class="text-h6">생성할 채팅방의 이름</div>
                    </q-card-section>

                    <q-card-section class="q-pt-none">
                      <q-input dense v-model="roomName" autofocus @keyup.enter="createRoom"/>
                    </q-card-section>

                    <q-card-actions align="right" class="text-primary">
                      <q-btn flat label="취소" v-close-popup/>
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
                <q-input rounded outlined dense class="WAL__field full-width" bg-color="white" v-model="search"
                         placeholder="Search or start a new conversation">
                  <template v-slot:prepend>
                    <q-icon name="search"/>
                  </template>
                </q-input>
              </q-toolbar>

              <!--              여기서 채팅방 조회 -->
              <q-scroll-area style="height: calc(100% - 100px)">
                <q-list>
<!--                  <q-item-->
<!--                    v-for="chatRoom in chatRoomList"-->
<!--                    :key="chatRoom.id"-->
<!--                    clickable-->
<!--                    v-ripple-->
<!--                    @click="selectedChatRoomId=chatRoom.id"-->
<!--                  >-->

                  <q-item
                    v-for="chatRoom in chatRoomList"
                    :key="chatRoom.id"
                    clickable
                    v-ripple
                    @click="enterChatRoom(chatRoom)"
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

<!--            채팅방으로 넘어가는 부분-->
            <q-page-container class="bg-grey-2">
              <ChatListPage :chatRoomId="selectedChatRoomId"></ChatListPage>
            </q-page-container>

            <q-footer>
              <q-toolbar class="bg-grey-3 text-black row">
                <q-btn round flat icon="insert_emoticon" class="q-mr-sm"/>
                <q-input rounded outlined dense class="WAL__field col-grow q-mr-sm" bg-color="white" v-model="message"
                         placeholder="Type a message"/>
                <q-btn round flat icon="mic"/>
              </q-toolbar>
            </q-footer>
          </q-layout>
        </div>

      </div>
    </q-item-section>
  </q-page>
</template>

<script>
import AppSidebar from "components/layout/AppSidebar.vue";
import { useQuasar } from 'quasar';
import { ref, computed } from 'vue';
import { axiosInstance } from "boot/axios";
import ChatListPage from "pages/chat/ChatListPage.vue";
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { BackURL } from "src/services/authService";

export default {
  name: "MessagesPage",
  components: { ChatListPage, AppSidebar },
  data() {
    return {
      chatRoomList: [],
      pageSize: 5,
      currentPage: 0,
      searchType: 'name',
      searchValue: '',
      isLastPage: false,
      isLoading: false,
      selectedChatRoomId: null,
      stompClient: null,
      loginUserNickName: null,
      chatData: '',

      testWhoSubscribed: []
    }
  },
  setup() {
    const $q = useQuasar();
    const leftDrawerOpen = ref(false);
    const search = ref('');
    const message = ref('');
    const style = computed(() => ({
      height: $q.screen.height + 'px'
    }));
    const roomName = ref('');
    function toggleLeftDrawer() {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    }
    async function createRoom() {
      console.log(roomName.value);
      if (roomName.value) {
        try {
          const response = await axiosInstance.post(BackURL + '/chat/room/' + roomName.value);
          console.log(response);
          if (response.data) {
            this.chatRoomList.push(response.data.result);
            this.loginUser = response.data.message;
            roomName.value = '';
            this.prompt = false;
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("Please enter the room name.");
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
      createRoom,
    }
  },
  created() {
    this.loadChatRooms();
    this.connect();
  },
  beforeUnmount() {
    if (this.stompClient) {
      this.stompClient.deactivate();
    }
  },
  methods: {

    connect() {
      // 인증 토큰 얻기
      let authToken = localStorage.getItem('accessToken');  // 인증 토큰을 얻는 방법은 API나 라이브러리에 따라 달라집니다.

      const socket = new SockJS('http://localhost:8080/ws', [], {
        headers: { 'Authorization': 'Bearer ' + authToken }  // 토큰을 헤더에 추가
      });

      socket.onopen = function() {
        console.log('WebSocket 연결이 열렸습니다.');
      };

      socket.onmessage = function(event) {
        console.log('서버로부터 메시지를 수신했습니다:', event.data);
      };

      socket.onerror = function(error) {
        console.error('WebSocket 오류 발생:', error);
      };

      socket.onclose = function(event) {
        if (event.wasClean) {
          console.log('WebSocket 연결이 정상적으로 닫혔습니다.');
        } else {
          console.error('WebSocket 연결이 끊겼습니다.'); // 예기치 않은 종료
        }
        console.log('코드:', event.code, '이유:', event.reason);
      };

      this.stompClient = new Client({
        webSocketFactory: () => socket,
        debug: (str) => console.log(str),
      });

      this.stompClient.activate();
    },

    async enterChatRoom(room) {
      try {

        this.selectedChatRoomId = room.id;
        const response = await axiosInstance.get('http://localhost:8080/chat/room/enter/' + this.selectedChatRoomId);
        this.loginUserNickName = response.data.message;

        if (this.stompClient && this.stompClient.connected) {
          this.stompClient.subscribe(`/user/${this.loginUserNickName}/sub/chat/enter/${this.selectedChatRoomId}`, this.handleMessage);
          console.log(this.loginUserNickName + '님이 SUBSCRIBE!');
        } else {
          console.log('stompClient가 아직 준비되지 않았습니다.');
        }
      } catch (error) {
        console.log(error);
      }
    },

    handleMessage(message) {
      let messageBody = JSON.parse(message.body);
      console.log('Received message:', messageBody);
    },


    sendMessage() {
      if (!this.stompClient || !this.stompClient.connected) {
        console.error('WebSocket is not connected');
        return;
      }
      this.chatData = {"roomId": this.chatRoomList.roomId, "sender": this.loginUserNickName,"message": this.message}
      this.stompClient.send('/chat/send', {}, this.chatData);
      console.log('Message sent:', this.chatData);
      this.message = ''; // Clear the input field after sending the message
    },

    async loadChatRooms() {
      this.isLoading = true;
      try {
        const response = await axiosInstance.get(BackURL + `/chat/rooms`);
        this.chatRoomList = response.data.result;
      } catch (error) {
        console.log(error);
      }
      this.isLoading = false;
    },


  },
  mounted() {
    window.addEventListener('scroll', this.scrollPagination);
  },
  scrollPagination() {
    const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 500;
    if (nearBottom && !this.isLastPage && !this.isLoading) {
      this.currentPage++;
      this.loadChatRooms();
    }
  },

  selectChatRoom(id) {
    this.$router.push({ name: 'ChatRoom', params });
  },

  searchChatRooms() {
    this.chatRoomList = [];
    this.currentPage = 0;
    this.isLastPage = false;
    this.loadChatRooms();
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
  margin-top: 0 !important
  font-size: 1.4rem
</style>
