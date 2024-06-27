<template>
  <div class="container">
    <div class="login-form">
      <div class="logo">
        <img src="https://placehold.co/50x50" alt="Logo" class="logo-img">
      </div>
      <h2 class="title">登录你的账户</h2>
      <div class="options">
        <button class="option active">登录</button>
        <button class="option">注册</button>
        <button class="option">找回密码</button>
      </div>
      <form @submit.prevent="handleLogin">
        <input type="text" placeholder="baymax" v-model="username" class="input-text" required>
        <!-- <div class="password-input"> -->
          <input type="password" placeholder="••••••••" v-model="password" class="input-password" required>
          <!-- <button class="toggle-password">
            <img src="https://placehold.co/20x20" alt="Show/Hide Password">
          </button> -->
        <!-- </div> -->
        <button type="submit" class="submit-btn">登录</button>
      </form>
      <p class="terms">点击「登录」表示已阅读并同意 <a href="#" class="terms-link">服务条款</a></p>
      <div class="other-login-methods">其他方式登录</div>
      <div class="login-options">
        <img src="https://placehold.co/40x40" alt="Login Option 1" class="login-option">
        <img src="https://placehold.co/40x40" alt="Login Option 2" class="login-option">
        <img src="https://placehold.co/40x40" alt="Login Option 3" class="login-option">
        <img src="https://placehold.co/40x40" alt="Login Option 4" class="login-option">
      </div>
      <div v-if="loginFailed" class="alert">
        登录失败：服务器错误
        <button @click="closeAlert">关闭</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      username: '',
      password: '',
      loginFailed: false,
    };
  },

  methods: {
    ...mapActions(['login']),
    async handleLogin() {
      try {
        const result = await this.login({ username: this.username, password: this.password });
        if (result.success) {
          if(result.role==="STUDENT"){
            this.$router.push('/test3');
          }else {
            this.$router.push('/home');
          }
          
        } else {
          alert('登录失败：' + result.message);
        }
      } catch (error) {
        console.error('登录失败：', error);
        this.loginFailed = true;
        alert('登录失败：服务器错误');
      }
    },
    closeAlert() {
      this.loginFailed = false;
    }
  }
};
</script>

<style scoped>
.container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to right, #93c5fd, #d8b4fe);
  padding: 1rem;
}

.login-form {
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  max-width: 28rem;
  width: 100%;
}

.logo {
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.logo-img {
  width: 3rem;
  height: 3rem;
}

.title {
  text-align: center;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.options {
  display: flex;
  justify-content: space-around;
  margin-bottom: 4rem; /* Adjust the margin as needed */
}

.option {
  font-weight: 600;
  color: #71717a;
  cursor: pointer;
}

.option.active {
  color: #3b82f6;
}

form div, .input-text, .input-password {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  outline: none;
}

.input-text:focus, .input-password:focus {
  ring: 2px solid #3b82f6;
}

.password-input {
  position: relative;
}

.toggle-password {
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
  color: #71717a;
  background: none;
  border: none;
  cursor: pointer;
}

.submit-btn {
  width: 100%;
  background: #3b82f6;
  color: white;
  padding: 0.5rem;
  border-radius: 0.375rem;
  margin-bottom: 1rem;
  cursor: pointer;
  Outline: none
}


.submit-btn:hover {
  background: #40a9ff;
}

.terms {
  text-align: center;
  color: #71717a;
  font-size: 0.875rem;
  margin-bottom: 1rem;
}

.terms-link {
  color: #3b82f6;
}

.other-login-methods {
  text-align: center;
  color: #71717a;
  margin-bottom: 1rem;
}

.login-options {
  display: flex;
  justify-content: space-around;
}

.login-option {
  width: 2.5rem;
  height: 2.5rem;
}

.alert {
  margin-top: 1rem;
  padding: 1rem;
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
