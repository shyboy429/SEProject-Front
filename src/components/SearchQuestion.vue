<template>
  <div class="search-question">
    <h3>查询试题</h3>
    <div class="search-filters">
      <div class="form-row">
        <div class="form-group" style="display: flex; align-items: center;">
          <label for="tag" style="margin-left: 30px; align-self: flex-start;">关键字:</label>
          <input type="text" id="tag" v-model="tag" placeholder="请输入关键字" style="margin-left: 20px;width: 800px;" />
        </div>
        <div class="form-group">
          <label for="question-type">题目类型:</label>
          <select id="question-type" v-model="questionType">
            <option value="选择题">选择题</option>
            <option value="判断题">判断题</option>
            <option value="填空题">填空题</option>
            <option value="问答题">问答题</option>
          </select>
        </div>
        <div class="form-group">
          <label for="difficulty">难度等级:</label>
          <select id="difficulty" v-model="difficulty">
            <option value="简单">简单</option>
            <option value="中等">中等</option>
            <option value="困难">困难</option>
          </select>
        </div>
        <button @click="searchQuestions" class="form-group" style="padding: 20px 0px 20px 35px; font-size: 18px;">查询题目</button>
      </div>
      
    </div>

    <div class="questions-list">
      <ul>
        <li v-for="question in paginatedQuestions" :key="question.id">
          {{ question.question }}
        </li>
      </ul>
      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1" style="padding: 5px 10px;">上一页</button>
        <button @click="nextPage" :disabled="currentPage === totalPages" style="padding: 5px 10px;">下一页</button>
      </div>
    </div>


  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'SearchQuestion',
  data() {
    return {
      searchKeyword: '',
      filterQuestionType: '',
      filterDifficulty: '',
      currentPage: 1,
      pageSize: 5
    };
  },
  computed: {
    ...mapState(['questions']),
    filteredQuestions() {
      return this.questions.filter(question => {
        const matchesKeyword = question.question.includes(this.searchKeyword);
        const matchesType = this.filterQuestionType ? question.questionType === this.filterQuestionType : true;
        const matchesDifficulty = this.filterDifficulty ? question.difficulty === this.filterDifficulty : true;
        return matchesKeyword && matchesType && matchesDifficulty;
      });
    },
    totalPages() {
      return Math.ceil(this.filteredQuestions.length / this.pageSize);
    },
    paginatedQuestions() {
      const start = (this.currentPage - 1) * this.pageSize;
      return this.filteredQuestions.slice(start, start + this.pageSize);
    }
  },
  methods: {
    ...mapActions(['fetchQuestions']),
    searchQuestions() {
      this.currentPage = 1;
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    }
  },
  mounted() {
    this.fetchQuestions();
  }
};
</script>

<style>
.search-question {
  flex: 1;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: auto;
  display: flex;
  flex-direction: column;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.tabs {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.tabs button {
  background-color: #409eff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  margin: 0 5px;
}

.tabs button.active {
  background-color: #66b1ff;
}

.form-container, .search-container {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h3 {
  text-align: center;
  margin-bottom: 20px;
}

form {
  display: flex;
  flex-direction: column;
}

.form-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  margin-left: 1px;
}

.form-group {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin: 0 15px;
}

.form-group:first-child {
  margin-left: 0;
}

.form-group:last-child {
  margin-right: 0;
}

label {
  margin-bottom: 5px;
  font-weight: bold;
}

input, select, textarea {
  padding: 10px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  font-size: 14px;
  width: 100%;
}

textarea {
  resize: vertical;
}

textarea#question, textarea#answer, textarea#analysis {
  height: 100px;
}

.submit-button {
  background-color: #409eff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  align-self: center;
  margin-top: 20px;
}

.submit-button:hover {
  background-color: #66b1ff;
}


.pagination {
  position: absolute;
  bottom: 40px; /* 距离底部的距离 */
  left: 57%; /* 水平居中 */
  transform: translateX(-50%); /* 水平居中 */
  display: flex;
  justify-content: space-between;
  width: 200px; /* 指定pagination的宽度 */
}

.pagination button {
  background-color: #409eff;
  color: #fff;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 80px; /* 指定按钮的宽度 */
}

.pagination button:disabled {
  background-color: #a0cfff;
}

</style>
