<template>
  <div class="home">
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

export default {
  name: 'Home',
  components: {
    SideBar,
    InputQuestion,
    SearchQuestion,
    PaperManagement
  },
  data() {
    return {
      currentContent: null,
    };
  },
  methods: {
    showContent(contentType) {
      if (contentType === 'input') {
        this.currentContent = 'InputQuestion';
      } else if (contentType === 'search') {
        this.currentContent = 'SearchQuestion';
      } else if (contentType = 'paper'){
        this.currentContent = 'PaperManagement'
      }
    },
  },
};
</script>

<style>
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
</style>
