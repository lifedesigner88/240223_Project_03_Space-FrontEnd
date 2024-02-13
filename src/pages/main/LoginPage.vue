<script>
export default {
  name: "LoginCompo",

  methods:{
    login(){
      this.$emit('LogineSucceed')
    }
  }
}
</script>

<template>
  <div class="login-box__bg">
    <div class="login-box__form">
      <form class="login-box__inputs" action="">
        <h1>encore SPACE</h1>
        <input type="email" placeholder="이메일" >
        <input type="password" placeholder="비밀번호">
        <input @click.prevent="login" type="submit" value="로그인"><br>
        <div class="btn-box">
          <button class="btn-github"
                  @click.prevent="login">Login with GitHub</button>
          <button class="btn-google"
                  @click.prevent="login">Login with Google</button>
          <button @click.prevent="$emit('CloseLogin')" class="btn-nologin">비회원 접속</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>

.login-box__bg {
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  position: fixed;
  z-index: 2;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-box__form {
  background-color: var(--modal-window-bg);
  width: 33vw;
  min-width: 400px;
  max-width: 550px;
  padding: 60px 60px;
  border-radius: 20px;
}


.login-box__inputs {
  display: flex;
  flex-direction: column;
  gap: 15px;
  h1{margin: 0 0 30px 0}

  input {
    width: 100%;
    padding: 18px;
    box-sizing: border-box;
    border-radius: 5px;
    cursor: pointer;
    border: none;
  }
}

.btn-box {
  display: flex;
  flex-direction: column;
  gap: 7px;

  button {
    width: 100%;
    padding: 18px;
    border: none;
    border-radius: 8px;
    color: white;
    cursor: pointer;
    transition: 0.4s ease 0s;

    &:hover {
      opacity: 0.8
    }
  }

  .btn-nologin {
    background: #0d61ce
  }

  .btn-google {
    background: #DB4437;
  }

  .btn-github {
    background: #333;
  }
}

</style>