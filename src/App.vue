<template>
  <div id="app">
    <Header />
    <div class="main-container">
      <Sidebar />
      <router-view />
    </div>
  </div>
</template>

<script>
import ExamPage from './components/ExamPage.vue';

export default {
  name: 'App',
  components: {
    ExamPage
  }
};
</script>

<style>
@import 'element-plus/dist/index.css';
/* body {
  margin: 0;
  font-family: Arial, sans-serif;
} */
/* #app {
  display: flex;
  flex-direction: column;
  height: 100vh;
} */

/* .main-container {
  display: flex;
  overflow: auto;
  flex: 1;
} */

body {
  margin: 0;
  font-family: Arial, sans-serif;
}

/* form {
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
} */
</style>