<template>
  <div>
    <h3>{{ question.title }}</h3>
    <p>{{ question.description }}</p>
    <p>类型: {{ question.type }}</p>
  </div>
</template>

<script>
export default {
  name: 'QuestionItem',
  props: ['question'],
};
</script>
