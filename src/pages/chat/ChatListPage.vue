<template>
  <div>
    {{ chatRoomId }}
  </div>
  <div>
    {{ loginUser }}
  </div>
  <div class="q-pa-md row justify-center" v-for="(msg, id) in chatMessage.chatList" :key="id">
    <div style="width: 100%; max-width: 400px">

      <q-chat-message v-if="this.loginUser == msg.sender"
                      :name=this.loginUser
                      :text="[msg.message]"
                      sent
      />
      <q-chat-message v-else
                      :name=msg.sender
                      :text="[msg.message]"
      />
    </div>
  </div>
  <div>
    <q-input rounded outlined dense class="WAL__field col-grow q-mr-sm"
             bg-color="white"
             v-model="message"
             placeholder="Type a message"
             @keyup.enter="sendMessage" />
    <q-btn round flat @click="sendMessage()" label="보내기" />
  </div>
</template>

<script>

import {axiosInstance} from "boot/axios";
import {Stomp} from "@stomp/stompjs";
import SockJS from "sockjs-client";

export default {

  props: {
    chatRoomId: {
      type: String,
      required: true
    },
    stompClient: {
      type: Object,   // stompClient의 타입은 객체입니다.
      required: true  // 이 prop은 필수입니다.
    },
  },

  computed: {

  },

  data() {
    return {
      chatMessage: [],
      loginUser: null,

      // 메시지 내용을 저장할 변수
      message: '',
    }
  },

  watch: {
    chatRoomId(newChatRoomId) {
      if (newChatRoomId) {
        this.roomDetail();
        if (!this.stompClient || !this.stompClient.connected) {
          console.error('STOMP connection is not established yet.');
          return;
        }
        if (this.subscribedChannel) {
          this.subscribedChannel.unsubscribe();
        }
        this.subscribedChannel = this.stompClient.subscribe(
          '/pub/chat/send/' + newChatRoomId,
          (response) => {
            let receivedMessage = JSON.parse(response.body);
            this.chatMessage = [...this.chatMessage, receivedMessage];
          }
        );
      } else {
        if (this.subscribedChannel) {
          this.subscribedChannel.unsubscribe();
        }
        this.chatMessage = [];
      }
    },

  },

  setup() {
    return {}
  },

  methods: {

    // initializeWebSocket() {
    //   const socket = new SockJS('http://localhost:8080/ws'); // 백엔드 WebSocket 엔드포인트 URL
    //   this.stompClient = Stomp.over(socket);
    // },

    roomDetail() {
      if (this.chatRoomId === null) {
        return;
      }
      axiosInstance.get("http://localhost:8080/chat/room/enter/" + this.chatRoomId)
        .then(response => {
          this.chatMessage = response.data.result;
          this.loginUser = response.data.message;
        })
        .catch(error => {
          console.log(error);
        });
    },

    sendMessage() {
      if (!this.stompClient || !this.stompClient.connected) {
        console.error('STOMP connection is not established yet.');
        return;
      }

      this.stompClient.send('/pub/chat/send/' + this.chatRoomId, {}, JSON.stringify({
        // 채팅 메시지 내용
        sender: this.loginUser,
        roomId: this.chatRoomId,
        message: this.message
      }));
      // 메시지를 보낸 후 필요한 작업 수행
      this.message = '';
    },
  },

  created() {
    // this.initializeWebSocket();
    this.roomDetail();
  },

  mounted() {
    console.log('chatRoomId:' + this.chatRoomId);
    this.roomDetail();


    window.addEventListener('scroll', this.scrollPagination);
    // this.initializeWebSocket(); // WebSocket 초기화
    this.stompClient.connect({}, () => {
      // STOMP 클라이언트 연결 성공 시 실행되는 콜백 함수
      console.log('STOMP client connected successfully.');
      // 특정 토픽 구독
      this.stompClient.subscribe('/sub/chat/send', (response) => {
        console.log('Received message:', response.body);
        // 메시지를 받았을 때 실행할 작업 추가
      });
    });
  }

};
</script>

<style lang="scss" scoped>


</style>
