<template>
  <div class="flex-1 p-4">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-xl font-bold">考试</h1>
      <button class="bg-green-500 text-white px-4 py-2 rounded">整卷预览</button>
    </div>
    <div class="bg-white p-4 rounded shadow">
      <div class="flex justify-between items-center mb-4">
        <button class="bg-zinc-200 dark:bg-zinc-200 text-zinc-700 dark:text-zinc-700 px-4 py-2 rounded">上一题</button>
        <button class="bg-blue-500 text-white px-4 py-2 rounded">下一题</button>
      </div>
      <div class="mb-4">
        <h2 class="text-lg font-bold">3. (单选题 5分): 单片机的堆栈指针 SP 始终是()</h2>
        <div class="mt-2">
          <label class="block mb-2">
            <input type="radio" name="question3" class="mr-2"> 指示堆栈地址
          </label>
          <label class="block mb-2">
            <input type="radio" name="question3" class="mr-2"> 指示堆栈底
          </label>
          <label class="block mb-2">
            <input type="radio" name="question3" class="mr-2"> 指示堆栈顶
          </label>
          <label class="block mb-2">
            <input type="radio" name="question3" class="mr-2"> 指示堆栈长度
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExamPanel'
};
</script>

<style scoped>
/* Add your styles here */
</style>
