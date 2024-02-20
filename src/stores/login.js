import { defineStore } from 'pinia';

export const useAuthStore  = defineStore('auth', {
  state: () => ({
    isLoggedIn: false
  }),

  getters: {
    getLoggedIn(state) {
      // 현재 로그인 상태를 반환합니다.
      return state.isLoggedIn;
    }
  },
  actions: {
    login() {
      this.isLoggedIn = true;
      return true; // 항상 참을 반환
    },
    logout() {
      this.isLoggedIn = false;
      return true; // 항상 참을 반환
    }
  }


})
