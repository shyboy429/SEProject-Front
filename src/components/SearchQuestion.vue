<template>
  <div class="search-question">
    <h3>查询试题</h3>
    <div class="search-filters">
      <div class="form-row">
        <div class="form-group" style="display: flex; align-items: center;">
          <label for="tag" style="margin-left: 30px; align-self: flex-start;">关键字:</label>
          <input type="text" id="tag" v-model="tag" placeholder="请输入关键字" style="margin-left: 20px;width: 700px;" />
        </div>
        <div class="form-group">
          <label for="question-type">题目类型:</label>
          <select id="question-type" v-model="questionType">
            <option value="">全部</option>
            <option value="选择题">选择题</option>
            <option value="判断题">判断题</option>
            <option value="填空题">填空题</option>
            <option value="问答题">问答题</option>
          </select>
        </div>
        <div class="form-group">
          <label for="difficulty">难度等级:</label>
          <select id="difficulty" v-model="difficulty">
            <option value="">全部</option>
            <option value="简单">简单</option>
            <option value="中等">中等</option>
            <option value="困难">困难</option>
          </select>
        </div>
        <div class="form-group">
          <label for="difficulty">我的题目</label>
            <el-checkbox v-model="myQuestions" sytle="width: 10px;" label="" value="Value1" border />
        </div>
        
        <button @click="searchQuestions" class="form-group button2" style="padding: 20px 0px 20px 35px; font-size: 18px;">查询题目</button>

      </div>
      
    </div>
                    <!-- 表格数据绑定和默认宽度 -->
              
  <el-table :data="tableData" style="width: 100%; margin-left: 6%;" @sort-change="sortChange" >
    <el-table-column type="index" width="50"></el-table-column>
    <el-table-column prop="question" sortable='custom' label="问题" width="300">
      <template #default="scope">
        <el-tooltip
          class="item"
          effect="light"
          :content="scope.row.question"
          placement="bottom-start"
          :fallback-placements="['top-start']"
          :hide-after="0"
          popper-class="custom-tooltip"
        >
          <div class="ellipsis">{{ scope.row.question }}</div>
        </el-tooltip>
      </template>
    </el-table-column>
    <el-table-column prop="questionType" sortable='custom' label="题型" width="180"></el-table-column>
    <el-table-column prop="tag" sortable='custom'  label="标签" width="180"></el-table-column>
    <el-table-column prop="difficulty" sortable='custom' label="难度" width="120"></el-table-column>
    <el-table-column prop="createdBy"   sortable='custom' label="创建人" width="120"></el-table-column>
    <el-table-column label="操作" width="220" header-align="center">
      <template #default="scope">
        <div style="display: flex; justify-content: space-between;">
          <el-button size="small" type="primary" :disabled="(user.role !== 'ADMIN')" @click="composePaper(scope.$index, scope.row)">组卷</el-button>
          <el-button size="small" type="success" :disabled="(user.username !== scope.row.createdBy) && (user.role !== 'ADMIN')" plain @click="dialogTableVisible = true; handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="small" type="danger" :disabled="(user.username !== scope.row.createdBy) && (user.role !== 'ADMIN')" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </div>
      </template>
    </el-table-column>
  </el-table>
    <div class="questions-list">
      
      <!-- <ul>
        <li v-for="question in paginatedQuestions" :key="question.id">
          {{ question.question }}
        </li>
      </ul> -->
      <!-- <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1" style="padding: 5px 10px;">上一页</button>
        <button @click="nextPage" :disabled="currentPage === totalPages" style="padding: 5px 10px;">下一页</button>
      </div> -->
      
	<!-- <el-pagination
	:current-page="searchData.current"
	:page-size="searchData.limit"
	:total="total"
	:pager-count="6"
	style="text-align: center;margin-top: 20px;"
	layout="jumper, prev, pager, next, total"
	@current-change="getData" /> -->
       <el-dialog v-model="dialogTableVisible" title="编辑题目" width="1050" style="margin-left:20%">
    <el-table :data="questionData" style="width: 100%" border @cell-click="showUnitInput">
      <el-table-column prop="description" label="问题" width="300">
        <template #default="{ row, column }">
          <el-input
            v-if="tableRowEditId === row.id && tableColumnEditIndex === column.id"
            @blur="blurValueInput(row, column)"
            @keyup.enter="blurValueInput(row, column)"
            v-model="row.description"
          />
          <span v-else>{{ row.description }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="题型" width="180">
    <template #default="{ row, column }">
      <el-select
        v-if="tableRowEditId === row.id && tableColumnEditIndex === column.id"
        @change="handleTypeChange(row)"
        v-model="row.type"
      >
        <el-option label="选择题" value="选择题"></el-option>
        <el-option label="判断题" value="判断题"></el-option>
        <el-option label="填空题" value="填空题"></el-option>
        <el-option label="问答题" value="问答题"></el-option>
      </el-select>
      <span v-else>{{ row.type }}</span>
    </template>
      </el-table-column>
      <el-table-column prop="tag" label="标签" width="180">
        <template #default="{ row, column }">
          <el-input
            v-if="tableRowEditId === row.id && tableColumnEditIndex === column.id"
            @blur="blurValueInput(row, column)"
            @keyup.enter="blurValueInput(row, column)"
            v-model="row.tag"
          />
          <span v-else>{{ row.tag }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="difficultLevel" label="难度" width="120">
    <template #default="{ row, column }">
      <el-select
        v-if="tableRowEditId === row.id && tableColumnEditIndex === column.id"
        @change="blurValueInput(row, column)"
        v-model="row.difficultLevel"
      >
        <el-option label="简单" value="简单"></el-option>
        <el-option label="中等" value="中等"></el-option>
        <el-option label="困难" value="困难"></el-option>
      </el-select>
      <span v-else>{{ row.difficultLevel }}</span>
    </template>
      </el-table-column>
      <el-table-column prop="answer" label="答案" width="120">
    <template #default="{ row, column }">
      <div v-if="tableRowEditId === row.id && tableColumnEditIndex === column.id">
        <el-select v-if="row.type === '选择题'" v-model="row.answer">
          <el-option label="A" value="A"></el-option>
          <el-option label="B" value="B"></el-option>
          <el-option label="C" value="C"></el-option>
          <el-option label="D" value="D"></el-option>
        </el-select>
        <el-select v-else-if="row.type === '判断题'" v-model="row.answer">
          <el-option label="正确" value="正确"></el-option>
          <el-option label="错误" value="错误"></el-option>
        </el-select>
        <el-input v-else v-model="row.answer" @blur="blurValueInput(row, column)" @keyup.enter="blurValueInput(row, column)" />
      </div>
      <span v-else>{{ row.answer }}</span>
    </template>
      </el-table-column>
      <el-table-column label="操作" width="120" header-align="center">
        <template #default="{ row }">
          <el-button type="primary" link @click="handleSubmit(row)">确定</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
    </div>

  <div class="pagination">
    <el-pagination
      :page-size="10"
      :pager-count="11"
      layout="prev, pager, next"
      :total="totalPages"
      @current-change="handlePageChange"
    />
  </div>
  </div>

</template>

<script >
import { mapActions, mapState } from 'vuex';
import { ElMessage } from 'element-plus';
import { ref } from 'vue'
let tableRowEditId = ref(null) // 控制可编辑的每一行
let tableColumnEditIndex = ref(null) //控制可编辑的每一列

const showUnitInput = (row, column) => {
  //赋值给定义的变量
  tableRowEditId.value = row.id //确定点击的单元格在哪行 如果数据中有ID可以用ID判断，没有可以使用其他值判断，只要能确定是哪一行即可
  tableColumnEditIndex.value = column.id //确定点击的单元格在哪列 
}
const blurValueInput = (row, column) => {
  // tableRowEditId.value = null
  // tableColumnEditIndex.value = null
  //在此处调接口传数据
}

export default {
  name: 'SearchQuestion',
  data() {
    return {
      searchKeyword: '',
      filterQuestionType: '',
      queryParams : {},
      orderArray: [],
      filterDifficulty: '',
      currentPage: 1,
      dialogTableVisible: false,
      myQuestions: false,
      pageSize: 5,
            tableRowEditId: null, // 控制可编辑的每一行
      tableColumnEditIndex: null, // 控制可编辑的每一列
      totalPages: 5,
    //   tableData: [
    //     { 
    //       question: '这是一个假问题?',
    //       questionType: '选择题',
    //       tag: '物理',
    //       difficulty: '中等',
    //       analysis: '这是一个问题的解析',
    //       createdBy: "小张",
    //       id: 5
    //     },
    //             { 
    //       question: '这是一个假问题2?',
    //       questionType: '选择题',
    //       tag: '物理',
    //       difficulty: '中等',
    //       analysis: '这是一个问题的解析',
    //       createdBy: "小张",
    //       id: 3
    //     }
    //   ]
    };
  },
  computed: {
    ...mapState(['questions', 'paper', 'user', 'question', 'questionsPages']),
    questionData(){
       return this.question.map(question => ({
        description: question.description,
        type: question.type,
        tag: question.tag,
        difficultLevel: question.difficultLevel,
        answer: question.answer,
        analysis:question.analysis,
        createdBy: question.createdBy,
        id: question.id,
        }));
    },
    tableData() {
      return this.questions.map(question => ({
        question: question.description,
        questionType: question.type,
        tag: question.tag,
        difficulty: question.difficultLevel,
        analysis: question.analysis,
        createdBy: question.createdBy,
           id: question.id,
      }));
    },
    filteredQuestions() {
      return this.questions.filter(question => {
        const matchesKeyword = question.question.includes(this.searchKeyword);
        const matchesType = this.filterQuestionType ? question.questionType === this.filterQuestionType : true;
        const matchesDifficulty = this.filterDifficulty ? question.difficulty === this.filterDifficulty : true;
        return matchesKeyword && matchesType && matchesDifficulty;
      });
    },
    computedTotal(){
      return this.totalPages*10;
    },
    totalPages() {
      return this.questionsPages;
      console.log("this", this.questionsPages);
      return 1000;
    },
    paginatedQuestions() {
      const start = (this.currentPage - 1) * this.pageSize;
      return this.filteredQuestions.slice(start, start + this.pageSize);
    }
  },
  methods: {
    ...mapActions(['fetchQuestions', 'deleteQuestion', 'addQuestionToPaper', 'removeQuestionFromPaper', 'fetchFileteredQuestions', 'fetchFileteredQuestion', 'updateQuestion', 'fetchQuestionsPages']),
    // viewQuestion(id){

      // },
    handleTypeChange(row) {
      if (row.type === '选择题') {
        row.answer = 'A';
      } else if (row.type === '判断题') {
        row.answer = '正确';
      } else {
        row.answer = '';
      }
    },
    showUnitInput(row, column) {
      // 赋值给定义的变量
      this.tableRowEditId = row.id; // 确定点击的单元格在哪行
      this.tableColumnEditIndex = column.id; // 确定点击的单元格在哪列
    },
    blurValueInput(row, column) {
      this.tableRowEditId = null;
      this.tableColumnEditIndex = null;
      // 在此处调接口传数据
    },
    async handleSubmit(row) {
      console.log(this.questions)
      // console.log('row',row)
      // console.log('row properties:', Object.keys(row));
      // const plainRow = JSON.parse(JSON.stringify(row));
      const newQuestion = {
        description: row.description,
        type: row.type,
        answer:row.answer,
        difficultLevel: row.difficultLevel,
        tag: row.tag,
        analysis: row.analysis,
      };
      console.log(newQuestion)
      // console.log(this.questions)
      const result = await this.updateQuestion({'id':row.id, 'question':newQuestion});
      if (result.success!=='error'){
          this.success('修改成功');
      } else {
        this.error(result.error);
      }
      // console.log('编辑操作:', index, row);
      // this.success('提交成功');
      this.queryParams.pageNum = this.currentPage;
      this.fetchQuestions(this.queryParams);
    },
    searchQuestions() {
      // this.currentPage = 1;
      
      // Initialize an empty queryParams object
      
      
      // Add fields to queryParams only if they are not empty
      if (this.tag) {
        this.queryParams.keywords = this.tag;
      } else {
        delete this.queryParams.keywords;
      }

      if (this.questionType) {
        this.queryParams.type = this.questionType;
      } else {
        delete this.queryParams.type;
      }

      if (this.difficulty) {
        this.queryParams.difficultLevel = this.difficulty;
      } else {
        delete this.queryParams.difficultLevel;
      }

      if (this.myQuestions) {
        this.queryParams.username = this.user.username;
      } else {
        delete this.queryParams.username;
      }
      delete this.queryParams.pageNum;
      // Fetch filtered questions with the constructed queryParams
      this.fetchFileteredQuestions(this.queryParams);
      this.queryParams.pageNum = 1;
      this.fetchQuestions(this.queryParams);
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        
        this.fetchQuestions(this.currentPage);
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.fetchQuestions(this.currentPage);
      }
    },
    handlePageChange(page) {
      console.log('Page changed to:', page); // 日志记录当前页码
      this.currentPage = page;
      this.queryParams.pageNum = page;
      this.fetchQuestions(this.queryParams); // 触发 Vuex action 以获取新页数据
    },
    composePaper(index, row) {
      const questionId = row.id; // 获取 question id
      // this.addQuestionToPaper(row);
      if (!this.paper.some(item => item.id === row.id)) {
        this.paper.push(row);
        this.success('加入成功');
      } else {
        this.warning('已加入');
      }
      console.log('组卷操作:', questionId);
      console.log(row)
      console.log(this.paper)
      
    },
    handleEdit(index, row) {
      // 处理编辑逻辑
      const result = this.fetchFileteredQuestion(row.id)
      // if (result.success=='success'){
      //     this.success('修改成功');
      // } else {
      //   this.error(result.error);
      // }
      // console.log('编辑操作:', index, row);

    },
    async handleDelete(index, row) {
      const questionId = row.id; // 获取 question id
      const result = await this.deleteQuestion(questionId);
      this.queryParams.pageNum = this.currentPage;
      await this.fetchQuestions(this.queryParams);
      if (result.success=='success'){
          this.success('删除成功');
      } else {
        this.error(result.error);
      }
      console.log('删除操作:', questionId);
    },
          sortMethod(obj1, obj2) {
        console.log(obj1, obj2)
      },
    sortChange({prop, order}) {
        // console.log(column, key, order)
        // console.log("sortrrrrrrrrrr", order)
        console.log("sortrrrrrrrrrr", prop)
        console.log("sortrrrrrrrrrr", order)
              console.log("sortrrrrrrrrrr", order)
      if (prop === 'tag') {
        this.sortTag('tag', order);
      }
      if (prop === 'question') {
        this.sortTag('description', order);
      }
      if (prop === 'questionType') {
        this.sortTag('type', order);
      }
      if (prop === 'difficulty') {
        this.sortTag('difficultLevel', order);
      }
      if (prop === 'createdBy') {
        this.sortTag('createdBy', order);
      }
    },
    handleSortChange({ prop, order }) {
    if (order) {
      // 参与排序
      let flagIsHave = false;
      this.orderArray.forEach((element) => {
        if (element.prop === prop) {
          element.order = order;
          flagIsHave = true;
        }
      });
      if (!flagIsHave) {
        this.orderArray.push({
          prop: prop,
          order: order,
        });
      }
    } else {
      // 不参与排序
      this.orderArray = this.orderArray.filter((element) => {
        return element.prop !== prop
      });
    }
    // 调后端接口进行排序操作, this.orderArray 就是最终排序后的集合
    console.log(this.orderArray);
  },

    sortTag(type, order) {
      if (type === 'tag') {
        if (order === 'ascending') {
          this.queryParams.orderAttribute='tag';
          this.queryParams.order = 'asc';
        } else if (order === 'descending') {
          this.queryParams.orderAttribute='tag';
          this.queryParams.order = 'desc';
        } else {
          delete this.queryParams.orderAttribute
          delete this.queryParams.tag; // 删除 order 字段
        }
        
      } else

      if (type === 'description') {
        if (order === 'ascending') {
          this.queryParams.orderAttribute='description';
          this.queryParams.order = 'asc';
        } else if (order === 'descending') {
          this.queryParams.orderAttribute='description';
          this.queryParams.order = 'desc';
        } else {
          delete this.queryParams.orderAttribute
          delete this.queryParams.order; // 删除 order 字段
        }
      }else

      if (type === 'type') {
        this.queryParams.orderAttribute='type';
        if (order === 'ascending') {
          this.queryParams.order = 'asc';
        } else if (order === 'descending') {
          this.queryParams.order = 'desc';
        } else {
          delete this.queryParams.orderAttribute
          delete this.queryParams.order; // 删除 order 字段
        }
      }else

      if (type === 'difficultLevel') {
        this.queryParams.orderAttribute='difficultLevel';
        if (order === 'ascending') {
          this.queryParams.order = 'asc';
        } else if (order === 'descending') {
          this.queryParams.order = 'desc';
        } else {
          delete this.queryParams.orderAttribute
          delete this.queryParams.order; // 删除 order 字段
        }
      }else

      if (type === 'createdBy') {
        this.queryParams.orderAttribute='createdBy';
        if (order === 'ascending') {
          this.queryParams.order = 'asc';
        } else if (order === 'descending') {
          this.queryParams.order = 'desc';
        } else {
          delete this.queryParams.orderAttribute
          delete this.queryParams.order; // 删除 order 字段
        }
      }else{
        delete this.queryParams.orderAttribute
        delete this.queryParams.order;
      }
      
      this.fetchQuestions(this.queryParams);
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
  },
  mounted() {
    this.queryParams.pageNum = this.currentPage;
    this.fetchQuestions(this.queryParams);
    this.fetchQuestionsPages();
    console.log('apagegas',this.totalPages);
  }

};
</script>

<style scoped>
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
  left: 58%; /* 水平居中 */
  transform: translateX(-50%); /* 水平居中 */
  display: flex;
    justify-content: center;
  align-items: center;
  /* justify-content: space-between; */
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

.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
}

.custom-tooltip {
  max-width: 200px; /* 设置最大宽度 */
  white-space: pre-wrap; /* 保证文本自动换行 */
  word-wrap: break-word; /* 自动换行 */
  word-break: break-all; /* 强制换行 */
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

.button2 {
  width: 100%;
  /* padding: 0.5rem; */
  background: #1890ff;
  border: none;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}

/* button:hover {
  background: #40a9ff;
}  */

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
</style>
