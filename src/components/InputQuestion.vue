<template>
  <div class="input-question">
    <h3>添加试题</h3>
    <form @submit.prevent="submitQuestion">
      <div class="form-row">
        <div class="form-group">
          
          
          <label for="question-type">
            <span class="required">*</span>
            题目类型:</label>
          
          <select id="question-type" v-model="questionType">
            <option value="选择题">选择题</option>
            <option value="判断题">判断题</option>
            <option value="填空题">填空题</option>
            <option value="问答题">问答题</option>
          </select>
        </div>
        <div class="form-group">
          <label for="tag"><span class="required">* </span>标签:</label>
          <input type="text" id="tag" v-model="tag" placeholder="请输入标签" />
        </div>
        <div class="form-group">
          <label for="difficulty"><span class="required">* </span>难度等级:</label>
          <select id="difficulty" v-model="difficulty">
            <option value="简单">简单</option>
            <option value="中等">中等</option>
            <option value="困难">困难</option>
          </select>
        </div>
        <div class="form-group" v-if="questionType === '选择题' || questionType === '判断题'">
          <label for="correct-option"><span class="required">* </span>正确选项:</label>
          <select id="correct-option" v-model="answer">
            <option v-if="questionType === '选择题'" value="A"> A</option>
            <option v-if="questionType === '选择题'" value="B">B</option>
            <option v-if="questionType === '选择题'" value="C">C</option>
            <option v-if="questionType === '选择题'" value="D">D</option>
            <option v-if="questionType === '判断题'" value="正确">正确</option>
            <option v-if="questionType === '判断题'" value="错误">错误</option>
          </select>
        </div>
      </div>
      <div class="form-group">
        <label for="question"><span class="required">* </span>题目:</label>
        <textarea id="question" v-model="question" placeholder="请输入题目内容"></textarea>
      </div>
      <div class="form-group" v-if="questionType === '选择题'">
        <label><span class="required">* </span>A:</label>
        <input type="text" v-model="optionA" placeholder="请输入选项A的内容" />
      </div>
      <div class="form-group" v-if="questionType === '选择题'">
        <label><span class="required">* </span>B:</label>
        <input type="text" v-model="optionB" placeholder="请输入选项B的内容" />
      </div>
      <div class="form-group" v-if="questionType === '选择题'">
        <label><span class="required">* </span>C:</label>
        <input type="text" v-model="optionC" placeholder="请输入选项C的内容" />
      </div>
      <div class="form-group" v-if="questionType === '选择题'">
        <label><span class="required">* </span>D:</label>
        <input type="text" v-model="optionD" placeholder="请输入选项D的内容" />
      </div>
      <div class="form-group" v-if="questionType === '填空题' || questionType === '问答题'">
        <label for="answer"><span class="required">* </span>答案:</label>
        <textarea id="answer" v-model="answer" placeholder="请输入答案"></textarea>
      </div>
      <div class="form-group">
        <label for="analysis">解析:</label>
        <textarea id="analysis" v-model="analysis" placeholder="请输入答案解析"></textarea>
      </div>
      <button type="submit" @click="submit" class="submit-button">立即添加</button>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState} from 'vuex';
import { ElMessage } from 'element-plus';
export default {
  name: 'InputQuestion',
  data() {
    return {
      questionType: '选择题',
      tag: '',
      difficulty: '',
      question: '',
      optionA: '',
      optionB: '',
      optionC: '',
      optionD: '',
      answer: '',
      analysis: ''
    };
  },
  computed: {
    ...mapState(['questions', 'paper', 'user', 'question']),

  },
  methods: {
    ...mapActions(['addQuestion']),
    submit (){
      // ElMessage({
      //   message: '提交成功',
      //   type: 'success',
      //   customClass: 'custom-message-class',
      //   duration: 3000,
      //   showClose: true
      // });
      
    },

    async submitQuestion() {
      const optionsText = `A.${this.optionA}\nB.${this.optionB}\nC.${this.optionC}\nD.${this.optionD}`;
      var _description = null;
      if (this.questionType === "选择题"){
        if(this.optionA && this.optionB&& this.optionC&& this.optionD){
           _description = `${this.question}\n${optionsText}`;
          
        }else{
         _description = null;
        }
         
      }
      else {
         _description = `${this.question}`;
      }
      
      const newQuestion = {
        id: "",
        description: _description,
        type: this.questionType,
        answer: this.answer,
        difficultLevel: this.difficulty,
        tag: this.tag,
        analysis: this.analysis,
        createdBy: this.user.username
      };

      const result = await this.addQuestion(newQuestion);
      if (result.success!=='error'){
          this.success('创建成功');
      } else {
        this.error(result.error);
      }
      this.resetForm();
    },
    resetForm() {
      this.questionType = '选择题';
      this.tag = '';
      this.difficulty = '';
      this.question = '';
      this.optionA = '';
      this.optionB = '';
      this.optionC = '';
      this.optionD = '';
      this.answer = '';
      this.analysis = '';
    },
    success(ms){
      ElMessage({
        message: ms,
        type: 'success',
        customClass: 'custom-message-class',
        duration: 3000,
        showClose: true
      });
    },
    warning(ms){
      ElMessage({
        message: ms,
        type: 'warning',
        customClass: 'custom-message-class',
        duration: 3000,
        showClose: true
      });
    },
    error(ms){
      ElMessage({
        message: ms,
        type: 'error',
        customClass: 'custom-message-class',
        duration: 3000,
        showClose: true
      });
    }
  }
};
</script>

<style scoped>
.input-question {
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

form {
  background: white;
  padding: 2rem;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

form div {
  margin-bottom: 1rem;
}

button {
  width: 100%;
  padding: 0.5rem;
  background: #1890ff;
  border: none;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background: #40a9ff;
}

.alert {
  margin-top: 1rem;
  padding: 1rem;
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.required {
  color: red;
}
</style>
