<template>
  <div class="flex flex-col h-screen bg-zinc-100">
    <Header />
    <div class="flex flex-1 overflow-hidden" style="margin-top: 72px;">
      <Sidebar />
      <div class="flex-1 p-6 overflow-auto">
        <!-- <div class="flex justify-between items-center mb-6">
          <div class="flex space-x-2">
            <button class="button teal">全部</button>
            <button class="button zinc">未开始</button>
            <button class="button teal">进行中</button>
            <button class="button pink">已完成</button>
            <button class="button teal">创建考试</button>
          </div>
        </div> -->
        <!-- <ExamList /> -->
      </div>
      <!-- <ExamList /> -->
    </div>
    <div class="flex flex-1 overflow-hidden" style="margin-top: -40px; margin-left: 300px;">
        <ExamList /> 
    </div>
  </div>
</template>

<script>
import Header from './Header.vue';
import Sidebar from './StudentSideBar.vue';
import ExamList from './ExamList.vue';
import { mapActions, mapState } from 'vuex';
import { ElMessage } from 'element-plus';
import * as echarts from 'echarts';
import { ref } from 'vue';

export default {
  components: {
    Header,
    Sidebar,
    ExamList
  },
  methods: {
    ...mapActions(['fetchExams', 'addPaper', 'addQuestionToPaper', 'removeFromPaper', 'fetchPaperQuestion', 'updatePaperQuestions', 'deletePaper', 'fetchExamsPages']),


  }
}
</script>

<style scoped>
.flex {
  display: flex;
}
.flex-col {
  flex-direction: column;
}
.h-screen {
  height: 100vh;
}
.bg-zinc-100 {
  background-color: #f3f4f6;
}
.dark\:bg-zinc-900 {
  background-color: #18181b;
}
.overflow-hidden {
  overflow: hidden;
}
.overflow-auto {
  overflow: auto;
}
.p-6 {
  padding: 1.5rem;
}
.mb-6 {
  margin-bottom: 1.5rem;
}
.space-x-2 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(0.5rem * var(--tw-space-x-reverse));
  margin-left: calc(0.5rem * calc(1 - var(--tw-space-x-reverse)));
}
.button {
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  border-radius: 0.375rem;
  transition-property: background-color, border-color, color, fill, stroke;
  transition-duration: 200ms;
}
.teal {
  background-color: #14b8a6;
  color: #fff;
}
.teal:hover {
  background-color: #0d9488;
}
.zinc {
  background-color: #d4d4d8;
  color: #18181b;
}
.zinc:hover {
  background-color: #e4e4e7;
}
.pink {
  background-color: #ec4899;
  color: #fff;
}
.pink:hover {
  background-color: #db2777;
}
</style>
