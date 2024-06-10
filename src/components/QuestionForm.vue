<template>
  <form @submit.prevent="submit">
    <input v-model="title" placeholder="题目" required />
    <textarea v-model="description" placeholder="描述" required></textarea>
    <select v-model="type">
      <option value="single">单选题</option>
      <option value="multiple">多选题</option>
      <option value="truefalse">判断题</option>
      <option value="essay">问答题</option>
    </select>
    <button type="submit">添加题目</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      description: '',
      type: 'single',
    };
  },
  methods: {
    submit() {
      const question = {
        title: this.title,
        description: this.description,
        type: this.type,
      };
      this.$emit('addQuestion', question);
      this.title = '';
      this.description = '';
      this.type = 'single';
    },
  },
};
</script>
