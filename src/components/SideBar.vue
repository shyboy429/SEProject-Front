<template>
  <aside class="sidebar">
    <div class="logo">后台管理系统</div>
    <nav>
      <ul>
        <li><router-link to="/home">首页</router-link></li>
        <li>
          <div @click="toggleQuestionMenu" class="menu-item">题库管理</div>
          <ul v-if="showQuestionMenu" class="sub-menu">
            <li @click="showContent('input')">录入题目</li>
            <li @click="showContent('search')">查询题目</li>
          </ul>
        </li>
        <li>角色管理</li>
        <li>菜单管理</li>
        <li>文件管理</li>
        <li>课程管理</li>
        <li>题目管理</li>
        <li>考试管理</li>
        <li @click="showContent('paper')">试卷管理</li>
      </ul>
    </nav>
  </aside>
</template>

<script>
export default {
  name: 'SideBar',
  data() {
    return {
      showQuestionMenu: false,
    };
  },
  methods: {
    toggleQuestionMenu() {
      this.showQuestionMenu = !this.showQuestionMenu;
    },
    showContent(contentType) {
      this.$emit('show-content', contentType);
    },
  },
};
</script>

<style>
.sidebar {
  width: 200px;
  height: 100vh;
  background: #334455;
  color: #fff;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  position: fixed;
  top: 0;
  left: 0;
  overflow-y: auto;
}

.logo {
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 1rem;
}

nav ul {
  list-style: none;
  padding: 0;
}

nav ul li {
  margin: 1rem 0;
  cursor: pointer;
}

nav ul li .menu-item {
  color: #fff;
}

nav ul li .menu-item:hover {
  text-decoration: underline;
}

nav ul li a {
  color: #fff;
  text-decoration: none;
}

nav ul li a:hover {
  text-decoration: underline;
}

.sub-menu {
  list-style: none;
  padding-left: 1rem;
  margin-top: 0.5rem;
}

.sub-menu li {
  margin: 0.5rem 0;
}
</style>
