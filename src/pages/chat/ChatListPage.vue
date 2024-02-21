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

    sendMessage() {
      if (!this.$parent.stompClient || !this.$parent.stompClient.connected) {
        console.error('WebSocket 연결이 되지 않았습니다');
        return;
      }

      /* 생성된 메시지를 서버로 전송합니다 */
      this.$parent.stompClient.send('/chat/send', {}, JSON.stringify({sender: this.loginUser, roomId: this.chatRoomId, message: this.message }));

      console.log('메시지가 전송되었습니다:', {sender: this.loginUser, roomId: this.chatRoomId, message: this.message});

      this.message = ''; // 메시지를 보낸 후 입력 필드를 비웁니다
    },
  },

  data() {
    return {
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
