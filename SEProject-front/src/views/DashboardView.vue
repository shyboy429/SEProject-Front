<template>
  <div>
    <h1>管理面板</h1>
    <router-link to="/dashboard/question-bank">题库管理</router-link>
    <router-link to="/dashboard/exam-paper">组卷管理</router-link>
    <router-link to="/dashboard/online-exam">在线考试</router-link>
    <router-view />
  </div>
</template>

<script>
export default {};
</script>
