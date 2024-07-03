<template>
  <div class="flex flex-col lg:flex-row p-4 space-y-4 lg:space-y-0 lg:space-x-4">
    <div class="profile-card">
      <div class="profile-header">
        <img src="https://placehold.co/50x50" alt="Profile" class="profile-img">
        <div>
          <h2 class="profile-name">John Rodriguez</h2>
          <p class="profile-status">(未认证)</p>
        </div>
      </div>
      <div class="profile-info">
        <div class="profile-tags">
          <span class="tag">未认证</span>
          <span class="tag">未认证</span>
        </div>
        <div class="profile-scores">
          <p>得分: <span class="score-green">55</span></p>
          <p>正确题数: <span class="score-red">11</span></p>
          <p>批阅: <span class="score-gray">0/0</span></p>
        </div>
      </div>
      <div class="profile-review-status">
        <h3>批阅状态</h3>
        <div class="review-tags">
          <span class="review-tag">未作答</span>
          <span class="review-tag review-machine">机器批阅</span>
          <span class="review-tag review-teacher">教师批阅</span>
        </div>
      </div>
      <div class="profile-questions">
        <h3>单选题</h3>
        <div class="questions-grid">
          <span v-for="i in 5" :key="i" :class="i === 5 ? 'question-active' : 'question'">{{ i }}</span>
        </div>
      </div>
    </div>
    <div class="exam-review-card">
      <div class="exam-header">
        <h2>考试批阅</h2>
        <button class="submit-btn">提交批阅</button>
      </div>
      <div class="exam-info">
        <div class="exam-tags">
          <span class="exam-tag exam-error">错误</span>
          <span class="exam-tag exam-type">批阅类型: 机器批阅</span>
          <span class="exam-tag exam-difficulty">难易程度: ★★★☆☆</span>
        </div>
        <div class="exam-answers">
          <p>答案: <span class="answer">A</span></p>
          <p>解析:</p>
        </div>
      </div>
      <div class="exam-question">
        <p>5. (单选题 5分): 在 CPU 内部,反映程序运行状态或反映运算结果的特征寄存器是( )。</p>
        <div class="options">
          <label v-for="option in ['PC', 'PSW', 'A', 'SP']" :key="option" class="option">
            <input type="radio" name="question" class="radio">
            <span>{{ option }}</span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // Add props, data, methods, etc. as needed
}
</script>

<style scoped>
.flex {
  display: flex;
}

.flex-col {
  flex-direction: column;
}

.lg\:flex-row {
  flex-direction: row;
}

.p-4 {
  padding: 1rem;
}

.space-y-4 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(1rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(1rem * var(--tw-space-y-reverse));
}

.lg\:space-y-0 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(0rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(0rem * var(--tw-space-y-reverse));
}

.lg\:space-x-4 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(1rem * var(--tw-space-x-reverse));
  margin-left: calc(1rem * calc(1 - var(--tw-space-x-reverse)));
}

.profile-card, .exam-review-card {
  width: 100%;
  background-color: white;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.dark .profile-card, .dark .exam-review-card {
  background-color: #1f2937;
}

.profile-card .profile-header {
  display: flex;
  align-items: center;

}

.profile-img {
  border-radius: 9999px;
}

.profile-name {
  font-size: 1.125rem;
  font-weight: 600;
  color: #fb923c;
}

.profile-status {
  color: #71717a;
}

.profile-info .profile-tags {
  display: flex;
}

.profile-info .tag {
  background-color: #e0f2fe;
  color: #0284c7;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
}

.profile-info .profile-scores p {
  color: #374151;
}

.profile-info .profile-scores .score-green {
  color: #22c55e;
}

.profile-info .profile-scores .score-red {
  color: #ef4444;
}

.profile-info .profile-scores .score-gray {
  color: #9ca3af;
}

.profile-review-status {
  margin-top: 1rem;
}

.profile-review-status h3 {
  color: #374151;
}

.profile-review-status .review-tags {
  display: flex;

  margin-top: 0.5rem;
}

.profile-review-status .review-tag {
  background-color: #e5e7eb;
  color: #111827;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
}

.profile-review-status .review-machine {
  background-color: #bfdbfe;
  color: #1d4ed8;
}

.profile-review-status .review-teacher {
  background-color: #bbf7d0;
  color: #065f46;
}

.profile-questions {
  margin-top: 1rem;
}

.profile-questions h3 {
  color: #374151;
}

.profile-questions .questions-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.profile-questions .question {
  background-color: #e0f2fe;
  color: #0284c7;
  padding: 0.25rem;
  text-align: center;
  border-radius: 0.25rem;
}

.profile-questions .question-active {
  background-color: #93c5fd;
  color: #1d4ed8;
}

.exam-review-card .exam-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.exam-review-card .exam-header h2 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #374151;
}

.exam-review-card .submit-btn {
  background-color: #14b8a6;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
}

.exam-review-card .exam-info {
  margin-top: 1rem;
}

.exam-review-card .exam-tags {
  display: flex;

}

.exam-review-card .exam-tag {
  background-color: #fee2e2;
  color: #b91c1c;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
}

.exam-review-card .exam-type {
  background-color: #dbeafe;
  color: #1d4ed8;
}

.exam-review-card .exam-difficulty {
  background-color: #ffedd5;
  color: #ea580c;
}

.exam-review-card .exam-answers p {
  color: #374151;
}

.exam-review-card .exam-answers .answer {
  color: #22c55e;
}

.exam-review-card .exam-question {
  margin-top: 1rem;
}

.exam-review-card .exam-question p {
  color: #374151;
}

.exam-review-card .options {
  margin-top: 0.5rem;
}

.exam-review-card .option {
  display: flex;
  align-items: center;
}

.radio {
  border-color: #14b8a6;
  background-color: #14b8a6;
}
</style>
