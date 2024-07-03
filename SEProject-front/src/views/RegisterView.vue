<template>
  <div class="container">
    <div class="login-form">
      <div class="logo">
        <!-- 添加 SVG 图标 -->
      </div>
      <h2 class="title">注册新账户</h2>
      <div class="options">
        <button class="option" @click="goToLogin">返回登录</button>
      </div>
      <form @submit.prevent="handleRegister">
        <input type="text" placeholder="请输入用户名" v-model="username" class="input-text" required>
        <input type="password" placeholder="设置密码" v-model="password" class="input-password" required>
        <input type="password" placeholder="确认密码" v-model="confirmPassword" class="input-password" required>
        <button type="submit" class="submit-btn">注册</button>
      </form>
      <p class="terms">您只能以<strong>「学生」</strong>身份注册，修改权限请联系管理员</p>
      <div v-if="registrationFailed" class="alert">
        注册失败：{{ registrationErrorMessage }}
        <button @click="closeAlert">关闭</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { ElMessage } from 'element-plus';
export default {
  data() {
    return {
      username: '',
      password: '',
      confirmPassword: '',
      registrationFailed: false,
      registrationErrorMessage: '',
    };
  },
  methods: {
    ...mapActions(['register']),
    goToLogin() {
      this.$router.push('/');
      },
    success(ms){
      ElMessage({
        message: ms,
        type: 'success',
        customClass: 'custom-message-class',
        duration: 3000,
        showClose: true
      });
    },
async handleRegister() {
  if (this.password !== this.confirmPassword) {
    this.registrationFailed = true;
    this.registrationErrorMessage = '两次密码不一致';
    return;
  }
  try {
    const result = await this.register({
      id: '',
      username: this.username,
      password: this.password,
      role: 'STUDENT'
    });
    if (result.id) {
        // alert('注册成功！请登录');
      this.success('注册成功！请登录')
      this.$router.push('/');
    } else {
      this.registrationFailed = true;
      this.registrationErrorMessage = result.error || '注册失败：未知错误';
    }
  } catch (error) {
    console.error('注册失败：', error);
    this.registrationFailed = true;
    this.registrationErrorMessage = '注册失败：服务器错误';
  }
},
    closeAlert() {
      this.registrationFailed = false;
      this.registrationErrorMessage = '';
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

.title {
  text-align: center;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.options {
  display: flex;
  justify-content: space-around;
  margin-bottom: 4rem;
}

.option {
  font-weight: 600;
  color: #71717a;
  cursor: pointer;
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

.submit-btn {
  width: 100%;
  background: #3b82f6;
  color: white;
  padding: 0.5rem;
  border-radius: 0.375rem;
  margin-bottom: 1rem;
  cursor: pointer;
  outline: none;
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
