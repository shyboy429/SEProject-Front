<template>
  <div class="sidebar" style="margin-top: 80px;">
    <div class="p-4">
      <!-- <img src="https://placehold.co/100x100" alt="Course Image" class="course-image mb-4"> -->
      <img :src="require('../assets/img/3.png')" alt="Background Image" class="background-image">

      <h2 class="course-title">JAVA从入门到精通</h2>
    </div>
    <nav class="mt-6">
      <a href="#" class="nav-link">课堂</a>
      <a href="#" class="nav-link">作业</a>
      <a href="#" class="nav-link">考试</a>
    </nav>
  </div>
</template>

<style scoped>
.sidebar {
  width: 16rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  height: 680px;
}
.dark\:bg-zinc-800 {
  background-color: #27272a;
}
.course-image {
  border-radius: 0.5rem;
}
.course-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
}
.dark\:text-zinc-200 {
  color: #e5e7eb;
}
.nav-link {
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  color: #4b5563;
  transition: background-color 0.2s;
}
.dark\:text-zinc-400 {
  color: #9ca3af;
}
.nav-link:hover {
  background-color: #e5e7eb;
}
.dark\:hover\:bg-zinc-700 {
  background-color: #374151;
}
.background-image {
  width: 100px; /* 图片的宽度 */
  height: 100px; /* 图片的高度 */
  object-fit: cover; /* 保持图片的长宽比，裁剪超出部分 */
}
</style>
