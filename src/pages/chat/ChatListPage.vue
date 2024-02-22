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
  },


  data() {
    return {
      chatMessage: [],
      loginUser: null,
      stompClient: null,
      // 메시지 내용을 저장할 변수
      message: '',
    }
  },

  watch: {
    chatRoomId(newChatRoomId) {
      if (this.stompClient && this.stompClient.connected) {
        this.stompClient.disconnect();
        console.log('WebSocket 연결 종료됨');
      }
      if (newChatRoomId) {
        this.roomDetail();
        this.initializeWebSocket()
      }

    },

  },

  setup() {
    return {}
  },

  methods: {
    initializeWebSocket() {
      const socket = new SockJS('http://localhost:8080/ws'); // 백엔드 WebSocket 엔드포인트 URL
      this.stompClient = Stomp.over(socket);
      this.stompClient.connect({}, (frame) => {
        console.log('WebSocket 연결됨');
        this.stompClient.subscribe('/sub/chat/send/'+this.chatRoomId, (response) => {
          console.log('받은 메시지:', response.body);
          // 여기에 새로운 메시지를 수신했을 때 실행되는 작업을 추가하세요.
        });
      }, (error) => {
        console.error('WebSocket 연결 오류:', error);
      });
    },

    sendMessage() {
      if (!this.stompClient || !this.stompClient.connected) {
        console.error('STOMP connection is not established yet.');
        return;
      }
      const messageData = {
        sender: this.loginUser,
        roomId: this.chatRoomId,
        message: this.message
      }
      console.log("Sending Data: ", messageData);


      this.stompClient.send('/pub/chat/send/'+this.chatRoomId, {}, JSON.stringify(messageData));

      // 메시지를 보낸 후 필요한 작업 수행
      this.message = '';
    },

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
  },

  created() {
    this.roomDetail();
  },

  mounted() {
    this.roomDetail();
    window.addEventListener('scroll', this.scrollPagination);
  },

};
</script>

<style lang="scss" scoped>


</style>
