<template>
  <div>
    {{ chatRoomId }}
  </div>
  <div>
    {{ chatMessage }}
  </div>
</template>

<script>
// 사용자가 채팅방 목록을 볼 수 있는 페이지. 이 페이지에는 사용자가 참여하고 있는 채팅방 목록이 표시

import {axiosInstance} from "boot/axios";

// function roomDetail() {
//   if (this.chatRoomId === null) {
//     return
//   }
//   axiosInstance.get("http://localhost:8080/chat/room/enter/" + this.chatRoomId)
//     .then(response => {
//       console.log(response);
//       this.chatMessage = response.data.result.chatList;
//
//     })
//     .catch(error => {
//       console.log(error);
//     });
// }

let chatMessage;
export default {
  props: {
    chatRoomId: {
      type: String,
      required: true
    },
    // roomDetail() {
    //
    // }
  },

  computed: {
    // {
    //   if (this.chatRoomId === null) {
    //     return
    //   }
    //   axiosInstance.get("http://localhost:8080/chat/room/enter/" + this.chatRoomId)
    //     .then(response => {
    //       console.log(response);
    //       this.chatMessage = response.data.result.chatList;
    //
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     });
    // },
  },

  methods: {
    roomDetail() {
      if (this.chatRoomId === null) {
        return;
      }
      axiosInstance.get("http://localhost:8080/chat/room/enter/" + this.chatRoomId)
        .then(response => {
          this.chatMessage = response.data.result;
        })
        .catch(error => {
          console.log(error);
        });


    }
  },

  data() {
    return {
      chatMessage: []
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
