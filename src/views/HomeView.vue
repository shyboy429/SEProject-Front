<template>
    <!-- <HeaderNav /> -->
    <div v-if="user && user.role !== 'STUDENT'" class="home">
      <SideBar @show-content="showContent" />
      <main class="main-content">
        <component :is="currentContent" />
      </main>
    </div>
</template>

<script>
import SideBar from '../components/SideBar.vue';
import InputQuestion from '../components/InputQuestion.vue';
import SearchQuestion from '../components/SearchQuestion.vue';
import PaperManagement from '../components/PaperManagement.vue';
import Shouye from '../components/Shouye.vue';
import ExamManagement from '../components/ExamManagement.vue'
import HeaderNav from '../components/HeaderNav.vue';
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';
import { ElMessage } from 'element-plus';

export default {
  name: 'Home',
  // const headerVisible = ref(true),
  components: {
    SideBar,
    InputQuestion,
    SearchQuestion,
    PaperManagement,
    Shouye,
    ExamManagement,
    HeaderNav
  },
  data() {
    return {
      currentContent: null,
      alertMessage: '',
    };
  },
  computed: {
    ...mapState(['examQuestions', 'examAnswers', 'examInfo', 'user', 'totalCount2']),

  },
  methods: {
    showContent(contentType) {
      if (contentType === 'input') {
        this.currentContent = 'InputQuestion';
      } else if (contentType === 'search') {
        this.currentContent = 'SearchQuestion';
      } else if (contentType === 'paper'){
        this.currentContent = 'PaperManagement';
      } else if (contentType === 'shouye'){
        this.currentContent = 'Shouye';
      } else if (contentType === 'exam'){
        this.currentContent = 'ExamManagement';
      }
    },
  },
  created() {
  if (!this.user||this.user.role==="STUDENT") {
    this.alertMessage = '未登录';
    ElMessage("未登录")
    setTimeout(() => {
      this.$router.push('/');
    }, 2000); // 等待2秒后跳转
  }
},

};
</script>

<style scoped>
.home {
  display: flex;
  height: 100vh;
  flex: 1;
}

.main-content {
  flex: 1;
  padding: 20px;
  margin-left: 200px;
  overflow: auto;
  display: flex;
  /* background-color: #df1a1a; 设置灰色背景 */
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
