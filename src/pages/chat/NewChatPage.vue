<template>
  <q-page class="my-page row container">
    <!-- 사이드 바 -->
    <AppSidebar class="fixed-sidebar"></AppSidebar>

    <q-item-section>
      <q-layout view="hHh lpR fFf">
        <!-- 채팅방 생성 -->
        <q-input filled v-model="newRoom.name" label="Room name" />
        <q-input filled v-model="newRoom.description" label="Room description" />
        <q-btn @click="createRoom" label="Create Room" />

        <!-- 채팅방 목록 -->
        <q-list bordered separator>
          <q-item clickable v-for="room in chatRooms" :key="room.id" @click="enterRoom(room.id)">
            <q-item-section>
              <q-item-label>{{ room.name }}</q-item-label>
              <q-item-label caption>{{ room.description }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>

        <!-- 채팅 -->
        <div v-if="currentRoomId">
          <q-chat-message v-for="msg in messages" :key="msg.id" :sent="isSent(msg)"
                          :text="[ msg.message ]" :name="msg.sender" profile-color="primary" />
          <q-input filled v-model="newMessage" label="Type Message" />
          <q-btn @click="sendChat" label="Send" />
        </div>
      </q-layout>
    </q-item-section>
  </q-page>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import socket from 'ws'
import AppSidebar from "components/layout/AppSidebar.vue";

export default {
  name: 'ChatPage',
  components: {AppSidebar},

  setup() {
    const chatRooms = ref([])
    const newRoom = ref({ name: '', description: '' })
    const messages = ref([])
    const newMessage = ref('')
    const currentRoomId = ref(null)
    const user = 'user' // replace this with actual user identification

    onMounted(async () => {
      const response = await axios.get('/chat/room')
      chatRooms.value = response.data.rooms
    })

    const createRoom = async () => {
      const response = await axios.post('/chat/room', newRoom.value)
      chatRooms.value.push(response.data)
      newRoom.value = { name: '', description: '' }
    }

    const enterRoom = async (roomId) => {
      currentRoomId.value = roomId
      const response = await axios.get(`/chat/room/${roomId}`)
      messages.value = response.data
      socket.emit('subscribe', roomId)
    }

    socket.on('chat message', (msg) => {
      messages.value.push(msg)
    })

    const sendChat = () => {
      socket.emit('chat message', { roomId: currentRoomId.value, message: newMessage.value })
      newMessage.value = ''
    }

    const isSent = (msg) => msg.sender === user

    return {
      chatRooms,
      newRoom,
      createRoom,
      messages,
      newMessage,
      currentRoomId,
      enterRoom,
      sendChat,
      isSent,
    }
  },
}
</script>
