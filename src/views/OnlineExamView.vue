<template>
  <div  v-if="user" class="min-h-screen flex flex-col bg-zinc-100 dark:bg-zinc-900">
    <header class="bg-zinc-800 text-white p-4 flex justify-between items-center custom-header">
      <h1 class="text-lg">考试</h1>
      <button @click="submit" class="bg-teal-500 text-white px-4 py-2 rounded">提交试卷</button>
    </header>
    <div class="flex flex-1">
      <aside class="w-1 bg-white dark:bg-zinc-800 p-4">
        <div class="flex flex-col items-center mb-4">
          <img :src="_user.avatar" alt="User" class="rounded-full mb-2" />
          <div class="text-center">
            <p class="text-lg font-bold">{{ this.user.username }}</p>
            <p class="text-sm text-zinc-500">{{ _user.university }}</p>
            <p class="text-sm text-blue-500">{{ this.user.id }}</p>
          </div>
        </div>
        <div class="bg-zinc-100 dark:bg-zinc-700 p-4 rounded mb-4">
          <p class="text-center text-zinc-500">
            已答: <span class="text-black dark:text-white">{{ answeredCount }}</span> 题数:
            <span class="text-black dark:text-white">{{ totalCount }}</span>
          </p>
        </div>
        <div class="bg-zinc-100 dark:bg-zinc-700 p-4 rounded mb-4">
          <!-- <p class="text-center text-xl font-bold">{{ timeRemaining }}</p> -->
          <div v-if="showCountdown">
  <el-countdown title="剩余时间" :value=this.value10 @finish="submit" />
</div>

          <p class="text-sm text-zinc-500">开始时间: {{ this.examInfo.startTime }}</p>
          <p class="text-sm text-zinc-500">结束时间: {{ this.examInfo.endTime }}</p>
        </div>
      </aside>

      <main class="flex-1 bg-white dark:bg-zinc-800 p-4">
        <div class="flex justify-between items-center mb-4">
          <el-button size="large" @click="previousQuestion" :disabled="currentQuestionIndex === 0" class="bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 px-4 py-2 rounded">
            上一题
          </el-button>
          <el-button size="large" @click="nextQuestion" :disabled="currentQuestionIndex === examQuestions.length - 1" class="bg-teal-500 text-white px-4 py-2 rounded">
            下一题
          </el-button>
        </div>
        <div class="mb-4">
          <p class="text-lg2 text-gray-500">{{ questionTypeAndScore(currentQuestion.type) }}</p>
          <p class="text-lg">{{ cleanedDescription(currentQuestion.description) }}</p>
          <div v-if="currentQuestion.type === '选择题'" class="mt-4">
            <div v-for="(option, index) in extractedOptions(currentQuestion.description)" :key="index">
              <label class="block mb-2">
                <input type="radio" :name="`question-${currentQuestion.id}`" class="mr-2" :value="option" @change="selectOption(currentQuestion.id, option)" :checked="isOptionSelected(currentQuestion.id, option)" /> {{ option }}
              </label>
            </div>
          </div>
          <div v-else-if="currentQuestion.type === '填空题'" class="mt-4">
            <label class="block mb-2">
              <input type="text" class="w-full p-2 border border-zinc-300 rounded" @input="updateAnswer(currentQuestion.id, $event.target.value)" :value="getExamAnswer(currentQuestion.id)" />
            </label>
          </div>
          <div v-else-if="currentQuestion.type === '判断题'" class="mt-4">
            <label class="block mb-2">
              <input type="radio" :name="`question-${currentQuestion.id}`" class="mr-2" value="正确" @change="selectOption(currentQuestion.id, '正确')" :checked="isOptionSelected(currentQuestion.id, '正确')" /> 正确
            </label>
            <label class="block mb-2">
              <input type="radio" :name="`question-${currentQuestion.id}`" class="mr-2" value="错误" @change="selectOption(currentQuestion.id, '错误')" :checked="isOptionSelected(currentQuestion.id, '错误')" /> 错误
            </label>
          </div>
          <div v-else-if="currentQuestion.type === '问答题'" class="mt-4">
            <label class="block mb-2">
              <textarea class="w-full p-2 border border-zinc-300 rounded" style="width: 400px;" rows="4" @input="updateAnswer(currentQuestion.id, $event.target.value)">{{ getExamAnswer(currentQuestion.id) }}</textarea>
            </label>
          </div>
        </div>
      </main>

      <aside class="w-1 bg-white dark:bg-zinc-800 p-4">
        <div class="mb-4">
          <p class="text-center text-zinc-500">作答状态</p>
          <div class="flex justify-around mt-2">
            <span class="bg-zinc-300 dark:bg-zinc-600 w-4 h-4 rounded-full inline-block" style="margin-left:70px"></span>
            未作答

            <span class="bg-green-300 dark:bg-green-600 w-4 h-4 rounded-full inline-block " style="margin-left:20px"></span>
            已作答
          </div>
        </div>
  <div class="mb-4">
    <p class="text-center text-zinc-500">单选题</p>
    <div class="grid grid-cols-5 gap-2">
            <el-button
        v-for="index in singleChoiceIndexes"
        :key="index"
        @click="goToQuestion(index)"
        :class="{
          'bg-green-300': questionStatus[examQuestions[index].id],  // 已作答
          'bg-zinc-300': !questionStatus[examQuestions[index].id]   // 未作答
        }"
      >
        {{ index + 1 }}
      </el-button>
    </div>
  </div>

  <div class="mb-4">
    <p class="text-center text-zinc-500">判断题</p>
    <div class="grid grid-cols-5 gap-2">
            <el-button
        v-for="index in trueFalseIndexes"
        :key="index"
        @click="goToQuestion(index)"
        :class="{
          'bg-green-300': questionStatus[examQuestions[index].id],  // 已作答
          'bg-zinc-300': !questionStatus[examQuestions[index].id]   // 未作答
        }"
      >

        {{ index + 1 }}
      </el-button>
    </div>
  </div>
  <div class="mb-4">
    <p class="text-center text-zinc-500">填空题</p>
    <div class="grid grid-cols-5 gap-2">
            <el-button
        v-for="index in fillInBlankIndexes"
        :key="index"
        @click="goToQuestion(index)"
        :class="{
          'bg-green-300': questionStatus[examQuestions[index].id],  // 已作答
          'bg-zinc-300': !questionStatus[examQuestions[index].id]   // 未作答
        }"
      >

        {{ index + 1 }}
      </el-button>
    </div>
  </div>
  <div>
    <p class="text-center text-zinc-500">问答题</p>
    <div class="grid grid-cols-5 gap-2">
            <el-button
        v-for="index in essayIndexes"
        :key="index"
        @click="goToQuestion(index)"
        :class="{
          'bg-green-300': questionStatus[examQuestions[index].id],  // 已作答
          'bg-zinc-300': !questionStatus[examQuestions[index].id]   // 未作答
        }"
      >
        {{ index + 1 }}
      </el-button>
    </div>
  </div>
      </aside>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';
import { ElMessage } from 'element-plus';
import { ref } from 'vue';

// const value = ref(Date.now() + 100 * 60 * 60 * 7)
// const value10 = ref(Date.now() + 1000 * 60 * 60 * 7); // 这里设置倒计时为7小时
// const value10 = 100000;

const loading = ref(false);
const svg = `
<path class="path" d="
  M 30 15
  L 28 17
  M 25.61 25.61
  A 15 15, 0, 0, 1, 15 30
  A 15 15, 0, 1, 1, 27.99 7.5
  L 15 15
" style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
`;

export default {
  data() {
    return {
      currentQuestionIndex: 0,
      _user: {
        avatar: 'https://placehold.co/100x100',
        name: 'baymax',
        university: '哈尔滨工业大学',
        id: '270123456'
      },
      questionStatus: {},
      totalCount: 0,
      // timeRemaining: '12641:36:25',
      startTime: '2022-12-06 09:59:00',
      endTime: '2022-12-09 09:59:00',
      // value10: null,
      showCountdown: false // 新添加的布尔值
      // value10: ref(Date.now() + 1000 * 60 * 1),
    };
  },
  computed: {
    ...mapState(['examQuestions', 'examAnswers', 'examInfo', 'user', 'totalCount2']),
    ...mapGetters(['getExamAnswer', 'getAnsweredCount']),
    // value10(){
    //   // this.value10.value = Date.now() + 1000 * 60 * this.examInfo.durationTime
    //   console.log("eeeeeee2:", ref(Date.now() + 1000 * 60 * this.examInfo.durationTime))
    //   return ref(Date.now() + 1000 * 60 * this.examInfo.durationTime);
      
    // },
    totalCount(){
      return this.totalCount2;
    },
      value10() {
    return Date.now() + 1000 * 60 * this.examInfo.durationTime;
  },
    currentQuestion() {
      return this.examQuestions[this.currentQuestionIndex];
    },
    answeredCount() {
      return this.getAnsweredCount;
    },
      singleChoiceIndexes() {
    return this.examQuestions
      .map((question, index) => ({ question, index }))
      .filter(item => item.question.type === '选择题')
      .map(item => item.index);
  },
  fillInBlankIndexes() {
    return this.examQuestions
      .map((question, index) => ({ question, index }))
      .filter(item => item.question.type === '填空题')
      .map(item => item.index);
  },
  trueFalseIndexes() {
    return this.examQuestions
      .map((question, index) => ({ question, index }))
      .filter(item => item.question.type === '判断题')
      .map(item => item.index);
  },
  essayIndexes() {
    return this.examQuestions
      .map((question, index) => ({ question, index }))
      .filter(item => item.question.type === '问答题')
      .map(item => item.index);
  },
    singleChoiceQuestions() {
      return this.examQuestions.filter(q => q.type === '选择题');
    },
    fillInBlankQuestions() {
      return this.examQuestions.filter(q => q.type === '填空题');
    },
    trueFalseQuestions() {
      return this.examQuestions.filter(q => q.type === '判断题');
    },
    essayQuestions() {
      return this.examQuestions.filter(q => q.type === '问答题');
    }
  },
  methods: {
    ...mapMutations(['setExamAnswer', 'submitExamAnswer']),
    ...mapActions(['submitExamAnswer', 'addPaper', 'addQuestionToPaper', 'removeFromPaper', 'fetchPaperQuestion', 'updatePaperQuestions', 'deletePaper', 'fetchPapersPages']),

    previousQuestion() {
      if (this.currentQuestionIndex > 0) {
        this.currentQuestionIndex--;
      }
    },
    async submit() {
      const loadingInstance = this.$loading({
        lock: true,
        text: 'Loading...',
        spinner: svg, // 使用自定义 SVG 图案
        background: 'rgba(0, 0, 0, 0.7)',
        customClass: 'custom-loading-svg', // 自定义样式类名
      });

      await this.submitExamAnswer(this.examAnswers);

      setTimeout(() => {
        loadingInstance.close();
        this.$router.push('/test3');
      }, 700);
    },
    nextQuestion() {
      if (this.currentQuestionIndex < this.examQuestions.length - 1) {
        this.currentQuestionIndex++;
      }
    },
    selectOption(questionId, option) {
      this.setExamAnswer({ questionId, answer: option });
      this.updateQuestionStatus(questionId);  // 调用更新状态的方法
    },
    updateAnswer(questionId, answer) {
      this.setExamAnswer({ questionId, answer });
      this.updateQuestionStatus(questionId);  // 调用更新状态的方法
    },
    updateQuestionStatus(questionId) {
      this.questionStatus[questionId] = !!this.getExamAnswer(questionId);
    },
    isOptionSelected(questionId, option) {
      return this.getExamAnswer(questionId) === option;
    },
    cleanedDescription(description) {
      const regex = /A\..*?\nB\..*?\nC\..*?\nD\..*/s;
      return description.replace(regex, '');
    },
    questionTypeAndScore(type) {
      var score;
      if (type==='选择题'){
        score = 3
      }else if(type==='判断题'){
        score = 3
      }else if(type==='填空题'){
        score = 5
      }else if(type==='问答题'){
        score = 10
      }
      return `${type}:${score}分`;
    },
    extractedOptions(description) {
      const options = description.match(/A\..*?\nB\..*?\nC\..*?\nD\..*/s);
      if (options) {
        return options[0].split(/(?=[A-D]\.)/).map(opt => opt.trim());
      }
      return [];
    },
    previewExam() {
      ElMessage({
        message: '即将打开整卷预览功能',
        type: 'info'
      });
    },
    goToQuestion(index) {
      this.currentQuestionIndex = index;
    }
  },
  mounted() {
      console.log("eeeeeee:", this.user)
      
      this.value10 = Date.now() + 1000 * 60 * this.examInfo.durationTime;
      this.showCountdown = true;
  },
  created() {
    console.log(this.user);
    if (!this.user) {
      this.alertMessage = '未登录';
      ElMessage("未登录")
      setTimeout(() => {
        this.$router.push('/');
      }, 2000); // 等待2秒后跳转
    }
  }
};
</script>




<style scoped>
.min-h-screen {
  min-height: 100vh;
}

.bg-zinc-100 {
  background-color: #f5f5f5;
}

.dark .bg-zinc-900 {
  background-color: #1a1a1a;
}

.bg-zinc-800 {
  background-color: #2d2d2d;
}

.text-white {
  color: #fff;
}

.p-4 {
  padding: 1rem;
}

.flex {
  display: flex;
}

.justify-between {
  justify-content: space-between;
}

.items-center {
  align-items: center;
}

.text-lg {
  font-size: 1.125rem;
}
.text-lg2 {
  font-size: 0.925rem;
}
.text-gray-500 {
  color: #737373;
}
.bg-teal-500 {
  background-color: #38b2ac;
}

.px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}

.py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

.rounded {
  border-radius: 0.25rem;
}

.w-1 {
  width: 20%;
}

.bg-white {
  background-color: #fff;
}

.dark .bg-zinc-800 {
  background-color: #2d2d2d;
}

.flex-col {
  flex-direction: column;
}

.mb-4 {
  margin-bottom: 1rem;
}

.rounded-full {
  border-radius: 9999px;
}

.text-center {
  text-align: center;
}

.font-bold {
  font-weight: 700;
}

.text-sm {
  font-size: 0.875rem;
}

.text-zinc-500 {
  color: #737373;
}

.text-blue-500 {
  color: #4299e1;
}

.bg-zinc-100 {
  background-color: #f5f5f5;
}

.dark .bg-zinc-700 {
  background-color: #3d3d3d;
}

.text-black {
  color: #000;
}

.dark .text-white {
  color: #fff;
}

.text-xl {
  font-size: 1.25rem;
}

.grid {
  display: grid;
}

.grid-cols-4 {
  grid-template-columns: repeat(4, 1fr);
}

.gap-2 {
  gap: 0.5rem;
}

.bg-teal-500 {
  background-color: #38b2ac;
}

.dark .text-zinc-300 {
  color: #d1d1d1;
}

.text-zinc-700 {
  color: #525252;
}

.text-zinc-300 {
  color: #d1d1d1;
}

.dark .bg-zinc-700 {
  background-color: #3d3d3d;
}

.block {
  display: block;
}

.mt-4 {
  margin-top: 1rem;
}

.mr-2 {
  margin-right: 0.5rem;
}

.flex-1 {
  flex: 1;
}

.w-4 {
  width: 1rem;
}

.h-4 {
  height: 1rem;
}

.rounded-full {
  border-radius: 9999px;
}

.inline-block {
  display: inline-block;
}

.bg-zinc-300 {
  background-color: #d1d1d1;
}

.dark .bg-zinc-600 {
  background-color: #525252;
}

.bg-orange-300 {
  background-color: #f6ad55;
}

.dark .bg-orange-600 {
  background-color: #dd6b20;
}

.bg-green-300 {
  background-color: #9ae6b4;
}

.dark .bg-green-600 {
  background-color: #48bb78;
}

.grid-cols-5 {
  grid-template-columns: repeat(5, 1fr);
}

.border {
  border-width: 1px;
}

.border-zinc-300 {
  border-color: #d1d1d1;
}

.custom-header {
  height: 25px;
  background-color: #606266;
}
</style>
