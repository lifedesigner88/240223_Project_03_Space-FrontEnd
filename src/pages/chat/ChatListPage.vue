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
import {Client} from "@stomp/stompjs";
import SockJS from "sockjs-client";

export default {
  props: {
    chatRoomId: {
      type: String,
      required: true
    },
  },

  watch: {
    chatRoomId(newChatRoomId) {
      if (newChatRoomId) {
        this.roomDetail();
      } else {
        this.chatMessage = []; // chatRoomId 가 null 일 경우 메시지 초기화
      }
    },
  },

  computed: {

  },

  methods: {
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

    sendMessage() {
      if (!this.stompClient || !this.stompClient.connected) {
        console.error('WebSocket 연결이 되지 않았습니다');
        return;
      }

      /* 생성된 메시지를 서버로 전송합니다 */
      // this.stompClient.publish('/chat/send', {}, JSON.stringify({sender: this.loginUser, roomId: this.chatRoomId, message: this.message }));
      this.stompClient.publish({
        destination: '/chat/send',
        headers: {},
        body: JSON.stringify({ sender: this.loginUser, roomId: this.chatRoomId, message: this.message })
      });

      console.log('메시지가 전송되었습니다:', {sender: this.loginUser, roomId: this.chatRoomId, message: this.message});

      this.message = ''; // 메시지를 보낸 후 입력 필드를 비웁니다
    },
  },

  data() {
    return {
      stompClient: null,
      chatMessage: [],
      loginUser: null,
      // 메시지 내용을 저장할 변수
      message: '',
    }
  },

  setup() {

    return {}

  },

  created() {
    this.connect();
    this.roomDetail();

  },

  mounted() {
    console.log('chatRoomId:' + this.chatRoomId);
    this.roomDetail();
  }
};
</script>

<style lang="scss" scoped>


</style>
