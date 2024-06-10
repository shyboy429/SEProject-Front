<template>
  <div>
    <h2>题库管理</h2>
    <QuestionForm @addQuestion="addQuestion" />
    <div v-for="question in questions" :key="question.id">
      <QuestionItem :question="question" />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import QuestionForm from './QuestionForm.vue';
import QuestionItem from './QuestionItem.vue';

export default {
  components: { QuestionForm, QuestionItem },
  computed: {
    ...mapState(['questions']),
  },
  methods: {
    ...mapActions(['fetchQuestions', 'addQuestion']),
  },
  created() {
    this.fetchQuestions();
  },
};
</script>
