<template>
  <div>
    <h2>在线考试</h2>
    <div v-for="exam in exams" :key="exam.id">
      <h3>{{ exam.title }}</h3>
      <button @click="startExam(exam.id)">开始考试</button>
    </div>
    <div v-if="currentExam">
      <h3>{{ currentExam.title }}</h3>
      <div v-for="question in currentExam.questions" :key="question.id">
        <h4>{{ question.title }}</h4>
        <div v-if="question.type === 'single'">
          <label v-for="(option, index) in question.options" :key="index">
            <input type="radio" :name="question.id" :value="option" v-model="answers[question.id]" />{{ option }}
          </label>
        </div>
        <div v-if="question.type === 'multiple'">
          <label v-for="(option, index) in question.options" :key="index">
            <input type="checkbox" :value="option" v-model="answers[question.id]" />{{ option }}
          </label>
        </div>
        <div v-if="question.type === 'truefalse'">
          <label>
            <input type="radio" :name="question.id" value="true" v-model="answers[question.id]" /> 真
          </label>
          <label>
            <input type="radio" :name="question.id" value="false" v-model="answers[question.id]" /> 假
          </label>
        </div>
        <div v-if="question.type === 'essay'">
          <textarea v-model="answers[question.id]"></textarea>
        </div>
      </div>
      <button @click="submitExam">提交考试</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      currentExam: null,
      answers: {},
    };
  },
  computed: {
    ...mapState(['exams']),
  },
  methods: {
    ...mapActions(['fetchExams', 'submitExam']),
    startExam(examId) {
      this.currentExam = this.exams.find(exam => exam.id === examId);
      this.answers = {};
    },
    async submitExam() {
      await this.submitExam({ examId: this.currentExam.id, answers: this.answers });
      alert('考试提交成功');
      this.currentExam = null;
    },
  },
  created() {
    this.fetchExams();
  },
};
</script>
