<template>
  <div class="login">
    <h2>管理员登录</h2>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="username">用户名:</label>
        <input type="text" v-model="username" required />
      </div>
      <div>
        <label for="password">密码:</label>
        <input type="password" v-model="password" required />
      </div>
      <button type="submit">登录</button>
    </form>
    <div v-if="loginFailed" class="alert">
      登录失败：服务器错误
      <button @click="closeAlert">关闭</button>
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
          this.$router.push('/home');
        } else {
          alert('登录失败：' + result.message);
        }
      } catch (error) {
        console.error('登录失败：', error);
        alert(error)
        // alert('登录失败：服务器错误');
      }
    },
    closeAlert() {
      this.loginFailed = false;
    }
  }
};
</script>

<style>
.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
}

form {
  background: white;
  padding: 2rem;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

form div {
  margin-bottom: 1rem;
}

button {
  width: 100%;
  padding: 0.5rem;
  background: #1890ff;
  border: none;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background: #40a9ff;
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
