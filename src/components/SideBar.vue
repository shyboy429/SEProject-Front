<template>
  <aside class="sidebar" style="margin-left:-20px">
    <div class="logo">后台管理系统</div>
    <el-menu
      active-text-color="#ffd04b"
      background-color="#545c64"
      class="el-menu-vertical-demo"
      default-active="2"
      text-color="#fff"
      @open="handleOpen"
      @close="handleClose"
    >
      <el-menu-item index="1" @click="showContent('shouye')">
        <el-icon><HomeFilled /></el-icon>
        <span slot="title">首页</span>
      </el-menu-item>

      <el-sub-menu index="2">
        <template #title>
          <el-icon><Grid /></el-icon>
          <span>题库管理</span>
        </template>
        <el-menu-item index="2-1" @click="showContent('input')">录入题目</el-menu-item>
        <el-menu-item index="2-2" @click="showContent('search')">查询题目</el-menu-item>
      </el-sub-menu>

      <el-menu-item index="3" @click="showTable('true')">
        <el-icon><UserFilled /></el-icon>
        <span slot="title">角色管理</span>
      </el-menu-item>

      <el-menu-item index="4" @click="showContent('exam')">
        <el-icon><Management /></el-icon>
        <span slot="title">考试管理</span>
      </el-menu-item>

      <el-menu-item index="5" @click="showContent('paper')">
        <el-icon><List /></el-icon>
        <span slot="title">试卷管理</span>
      </el-menu-item>

      <el-menu-item index="6" @click="exit()">
        <el-icon><CircleCloseFilled /></el-icon>
        <span slot="title">退出</span>
      </el-menu-item>
    </el-menu>
  </aside>
</template>

<script>
import { ElMessage } from 'element-plus';
import { mapState } from 'vuex';
import { HomeFilled, Edit, Search, Setting, User, Document,  CircleClose ,UserFilled, Grid,Management, List,CircleCloseFilled} from '@element-plus/icons-vue';

export default {
  name: 'SideBar',
  data() {
    return {
      showQuestionMenu: false,
    };
  },
    components: {
    HomeFilled,
    Edit,
    Search,
    Setting,
    User,
    Document,
    CircleClose,
    Grid,
    UserFilled,
    Management,
    List,
    CircleCloseFilled
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    toggleQuestionMenu() {
      this.showQuestionMenu = !this.showQuestionMenu;
    },
    showContent(contentType) {
      this.$emit('show-content', contentType);
    },
    showTable(contentType) {
      if (this.user.role!=="ADMIN"){
        this.warning("权限不足")
      } else {
        this.$emit('show-table', contentType);
      } 
      
    },
    tip(ms){
      ElMessage({
        message: ms,
        duration: 3000,
        showClose: true
      });
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
    warning(ms){
      ElMessage({
        message: ms,
        type: 'warning',
        customClass: 'custom-message-class',
        duration: 3000,
        showClose: true
      });
    },
    error(ms){
      ElMessage({
        message: ms,
        type: 'error',
        customClass: 'custom-message-class',
        duration: 3000,
        showClose: true
      });
    },
    exit(){
      this.$router.push('/');
    }
  },
};
</script>

<style>
.icon {
  font-size: 16px; /* 调整图标大小 */
  margin-right: 8px; /* 为图标和文本添加间距 */
}
.sidebar {
  width: 200px;
  height: 100vh;
  background: #545c64;
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
.el-menu-vertical-demo {
  width: 150%; /* 使 el-menu 适应 sidebar 的宽度 */
  border: none;
}
</style>
