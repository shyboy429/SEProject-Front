<template>
  <div class="container">
    <div class="form-row">
      <div class="form-group">
        <label>考试管理</label>
      </div>
      <div class="form-group" style="margin-left:57%">
          <el-button-group class="ml-4">
            <el-button
              v-for="(button, index) in buttons2"
              :key="index"
              :type="button.isActive ? 'success' : 'default'"
               @click="handleButtonClick(button.method, index)"
            >
              {{ button.label }}
            </el-button>
          </el-button-group>
      </div>
      <div class="form-group">
        <el-button type="primary" :disabled="(user.role !== 'ADMIN')" @click="dialogFormVisible = true" style="width: 80px;">创建考试</el-button>
      </div>
    </div>

    <!-- 表格数据绑定和默认宽度 -->
    <el-table :data="tableData" style="width: 100%; margin-left: 3%;">
      <!-- 每一个列，prop为主键，label为文案 -->
      <!-- 索引 -->
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="name" label="考试名称" width="200" header-align="left"></el-table-column>
      <el-table-column prop="introduction" label="考试介绍" width="200" header-align="left"></el-table-column>
      <el-table-column prop="startTime" label="开始时间" width="200" header-align="left"></el-table-column>
      <el-table-column prop="endTime" label="结束时间" width="200" header-align="left"></el-table-column>
      <el-table-column prop="durationime" label="限时" width="120"></el-table-column>
      <el-table-column label="操作" width="220" header-align="center" :header-cell-style="{ paddingLeft: '0px' }">
        <template #default="scope">
          <div style="display: flex; justify-content: space-between;">
            <el-button size="small" type="primary"  @click="dialogTableVisible = true; queryPaper(scope.$index, scope.row)">编辑</el-button>
            <el-button size="small" type="danger" :disabled="(user.username !== scope.row.createdBy)&&(user.role!=='ADMIN')" @click="handlePaperDelete(scope.$index, scope.row)">删除</el-button>
            <el-button size="small" type="info" @click="dialogChartVisible = true; analysis(scope.$index, scope.row); ">试卷分析</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <!-- <div class="questions-list">
      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1" style="padding: 5px 10px;">上一页</button>
        <button @click="nextPage" :disabled="currentPage === totalPages" style="padding: 5px 10px;">下一页</button>
      </div>
    </div> -->


    <el-dialog v-model="dialogTableVisible" title="编辑试卷" width="950">
      <el-table :data="paperData">
        <el-table-column prop="question" label="问题" width="300"></el-table-column>
        <el-table-column prop="questionType" label="题型" width="180"></el-table-column>
        <el-table-column prop="tag" label="标签" width="180"></el-table-column>
        <el-table-column prop="difficulty" label="难度" width="120"></el-table-column>
        <el-table-column label="操作" width="120" header-align="center">
        <template #default="{ row }">
          <el-button type="primary" :disabled="(user.role !== 'ADMIN')" link @click="handleDelete(row)" style="text-align: left;padding-left: 0px;">移出试卷</el-button>
        </template>
      </el-table-column>
      </el-table>
    </el-dialog>

    <el-dialog v-model="dialogTable2Visible" title="试题篮" width="950px">
      <el-table :data="selectedData" >
        <el-table-column prop="question" label="问题" width="300"></el-table-column>
        <el-table-column prop="questionType" label="题型" width="180"></el-table-column>
        <el-table-column prop="tag" label="标签" width="180"></el-table-column>
        <el-table-column prop="difficulty" label="难度" width="120"></el-table-column>
        <el-table-column label="操作" width="120" header-align="center">
        <template #default="{ row }">
          <el-button type="primary" link @click="handleCartDelete(row)" style="text-align: left;padding-left: 0px;">移出试卷</el-button>
        </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <!-- 创建试卷的对话框 -->
    <el-dialog v-model="dialogFormVisible" title="创建考试">
      <el-form :model="form"  >
        <el-form-item label="考试时间" :label-width="formLabelWidth">
            <div class="demo-range">
              <el-date-picker
                v-model="value1"
                type="datetimerange"
                start-placeholder="Start date"
                end-placeholder="End date"
                format="YYYY-MM-DD HH:mm:ss"
                date-format="YYYY/MM/DD ddd"
                time-format="A hh:mm:ss"
              />
            </div>
        </el-form-item>
        <el-form-item label="考试名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="考试介绍" :label-width="formLabelWidth">
          <el-input v-model="form.introduction" autocomplete="off" />
        </el-form-item>
        <el-form-item label="试卷" :label-width="formLabelWidth">
          <el-input v-model="form.paperTitle" autocomplete="off" />
        </el-form-item>

        <el-form-item label="考试限时" :label-width="formLabelWidth">
          <el-input v-model="form.timeLimit" autocomplete="off" placeholder="输入考试限时(分钟)" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="saveExam">确认</el-button>
          <el-button @click="dialogFormVisible = false">取消</el-button>
        </div>
      </template>
    </el-dialog>

    <el-dialog v-model="dialogChartVisible" title="试卷分析" width="700px" style="margin-left:33%; margin-top:3% ">
      <!-- <div style="display: flex; justify-content: space-between;"> -->
        <div id="myChart" style="width: 650px; height: 300px;"></div>
        <div id="myChart2" style="width: 650px; height: 300px;"></div>
      <!-- </div> -->
    </el-dialog>

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
<script>
import { mapActions, mapState } from 'vuex';
import { ElMessage } from 'element-plus';
import * as echarts from 'echarts';
import { ref } from 'vue';

export default {
    setup() {
        const value1 = ref([
        new Date(2024, 9, 10, 8, 40),
        new Date(2025, 9, 10, 9, 40)
        ]);
        const value2 = ref([
        new Date(2016, 9, 10, 8, 40),
        new Date(2016, 9, 10, 9, 40)
        ]);

        return {
        value1,
        value2
        };
  },
  name: 'PaperManagement',
  data() {
    return {
      buttons2: [
        { label: '全部', isActive: true, method: this.getAll}, // 默认第一个按钮为激活状态
        { label: '未开始', isActive: false, method: this.getUnstarted },
        { label: '进行中', isActive: false, method: this.getPro },
        { label: '已完成', isActive: false, method: this.getEnded },
      ],

      dialogFormVisible: false,
      dialogTableVisible: false,
      chart: null,
      dialogChartVisible: false,
      dialogTable2Visible: false,
      paper_id: 0,
      formLabelWidth: '140px',
      form: {
        title: '',
        introduction: '',
        createdBy: '',
        createTime: '',
        updateTime: '',
      },
      searchKeyword: '',
      filterQuestionType: '',
      filterDifficulty: '',
      currentPage: 1,
      dict: {'pageNum':1, 'kind':'all'},
      pageSize: 5,
    //   tableData: [
    //     { 
    //       title: '这是一个假问题?',
    //       introduction: '选择题',
    //       createTime: '2024-06-03',
    //       updateTime: '2024-06-03',
    //       createdBy: "小张",
    //       id: 5
    //     }
    //   ],
    //   paperData: [
    //     { 
    //       question: '这是一个假问题?',
    //       questionType: '选择题',
    //       tag: '物理',
    //       difficulty: '中等',
    //       analysis: '这是一个问题的解析',
    //       createdBy: "小张",
    //       id: 5
    //     }
    //   ]
    };
  },
  computed: {
      ...mapState(['exams', 'paper', 'paperQuestions', 'user', 'examsPages']),
      totalPages() {
        console.log("pages",this.examsPages)
      return this.examsPages ;
      console.log("this", this.questionsPages);
      return 1000;
    },
    tableData() {
      return this.exams.map(exam => ({
        name: exam.name,
        // introduction: exam.introduction,
        startTime: exam.startTime,
        endTime: exam.endTime,
        durationTime: exam.durationTime,
        paperID: exam.paperTitle,
      }));
      },
        paperData() {
      return this.paperQuestions.map(question => ({
        question: question.description,
        questionType: question.type,
        tag: question.tag,
        difficulty: question.difficultLevel,
        analysis: question.analysis,
        id: question.id,
        createdBy: question.createdBy,
      }));
    },
    selectedData() {
      return this.paper.map(question => ({
        question: question.question,
        questionType: question.questionType,
        tag: question.tag,
        difficulty: question.difficulty,
        id: question.id,
        analysis: question.analysis,
        createdBy: question.createdBy,
      }));
    },
  },
  methods: {
    ...mapActions(['fetchExams', 'addPaper', 'addQuestionToPaper', 'removeFromPaper', 'fetchPaperQuestion', 'updatePaperQuestions', 'deletePaper', 'fetchExamPages', 'createExam']),

    getAll(){
      console.log("getall");
      this.dict.kind = 'all';
      this.dict.pageNum = 1;
      this.currentPage = 1;
      this.fetchExams(this.dict);
      this.fetchExamPages(this.dict['kind']);
    },
    getPro(){
      this.dict.kind = 'pro';
      this.dict.pageNum = 1;
      this.currentPage = 1;
      this.fetchExams(this.dict);
      this.fetchExamPages(this.dict['kind']);
    },
    getUnstarted(){
      this.dict.kind = 'unstart';
      this.dict.pageNum = 1;
      this.currentPage = 1;
      this.fetchExams(this.dict);
      this.fetchExamPages(this.dict['kind']);
    },
    getEnded(){
      this.dict.kind = 'end';
      this.dict.pageNum = 1;
      this.currentPage = 1;
      this.fetchExams(this.dict);
      this.fetchExamPages(this.dict['kind']);
    },
    handleButtonClick(method, index) {
      this.activateButton(this.buttons2, index);
      method(); // 调用传递的方法
    },
    activateButton(buttonGroup, index) {
      buttonGroup.forEach((button, i) => {
        button.isActive = i === index;
        //在这里增加发送请求
      });
    },
    
    automaticPaper() {
      // 自动组卷的逻辑
    },
    // addPaper() {
    //   this.dialogFormVisible = true;
    // },
    async saveExam() {
    //   const currentDateTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
    //   this.form.createTime = currentDateTime;
    //   this.form.updateTime = currentDateTime;
      console.log(this.value1);
      // const [startTime, endTime] = this.form.value1;
      const startTime = this.value1[0];
      const endTime = this.value1[1];
      console.log('Start Time:', startTime);
      console.log('End Time:', endTime);

      // 创建 newExam 对象
      const newExam = {
        name: this.form.name,
        introduction: this.form.introduction,
        paperId: this.form.paperTitle,
        publisher: this.user.username,
        startTime: startTime, // 开始时间
        endTime: endTime, // 结束时间
        durationTime: this.form.timeLimit, // 考试限时
      };

      const result = await this.createExam(newExam);
      this.dialogFormVisible = false;
      this.form = {
        name: '',
        introduction: '',
        paperTitle: '',
        createTime: '',
        timeLimit: ''
      };
      this.dict['pageNum'] = this.currentPage
      await this.fetchExams(this.dict);
      if (result.success=='success'){
          this.success('创建成功');
      } else {
        this.error('创建失败');
      }
      this.fetchExamPages(this.dict['kind']);
    },

    composePaper(index, row) {
      const questionId = row.id; // 获取 question id
      this.addQuestionToPaper(questionId);
      console.log('组卷操作:', questionId);
    },
    handleCartDelete( row) {
      const questionId = row.id; // 获取 question id
      console.log(row.id);
      this.removeFromPaper(questionId);
      // this.paper = this.paper.filter(item => item.id !== row.id);
      console.log(this.paper);
        ElMessage({
        message: '移除成功',
        type: 'success',
        customClass: 'custom-message-class',
        duration: 3000,
        showClose: true
      });
    },
    querySelected() {
      if (this.paper.length === 0) {
        this.selectedData = [];
      } else {
        this.selectedData = this.paper.map(question => ({
          question: question.question,
          questionType: question.questionType,
          tag: question.tag,
          difficulty: question.difficulty,
          analysis: question.analysis,
          createdBy: question.createdBy,
          id: question.id
        }));
      }
    },
    
    queryPaper(index, row) {
      console.log('query');
      const paperId = row.id; // 获取 question id
      this.paper_id = row.id;
      console.log('query');
      this.fetchPaperQuestion(paperId);
      console.log('查看试卷:', paperId);
    },
    async handlePaperDelete(index, row){
      const paperId = row.id; // 获取 question id
      await this.deletePaper(paperId);
      
      // this.paper_id = row.id;
      ElMessage({
        message: '删除成功',
        type: 'success',
        customClass: 'custom-message-class',
        duration: 3000,
        showClose: true
      });
      await this.fetchPapersPages();
      this.fetchPapers(this.currentPage);
    },
    analysis(index, row){
      this.queryPaper(index, row);
      this.initChart();
    },
    async handleDelete(row) {
      console.log(this.paper_id)
      const paperID = this.paper_id

      console.log(row);
      await this.updatePaperQuestions({'paperid':paperID, 'questionid':row.id});
      this.fetchPapers(this.currentPage);
      ElMessage({
        message: '移出成功',
        type: 'success',
        customClass: 'custom-message-class',
        duration: 3000,
        showClose: true
      });
    },
    // handleDelete(index, row) {
    //   this.tableData.splice(index, 1);
    // },
    // handleEdit(index, row) {
    //   // 编辑试卷的逻辑
    // },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage -= 1;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage += 1;
      }
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
    },

    initChart() {
      this.$nextTick(() => {
        console.log(this.paperQuestions);
      this.chart = echarts.init(document.getElementById('myChart'));

      // 计算每种类型的数量
      const typeCounts = this.paperQuestions.reduce((acc, item) => {
        acc[item.type] = (acc[item.type] || 0) + 1;
        return acc;
      }, {});

      // 将计算结果转换为 ECharts 数据格式
      const data = Object.keys(typeCounts).map(type => {
        return { value: typeCounts[type], name: type };
      });

      const option = {
        title: {
          text: '题目类型占比图:',
          left: 'left'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          type: 'scroll',
          orient: 'vertical',
          right: 0,
          top: 'center',
          icon: 'circle',
          selectedMode: 'multiple',
          formatter: (name) => {
            let total = data.reduce((sum, item) => sum + item.value, 0);
            let item = data.find(item => item.name === name);
            let p = (item.value / total * 100).toFixed(2);
            return `${name}  |  ${p}%`;
          }
        },
        series: [
          {
            name: '题目类型占比',
            type: 'pie',
            radius: '60%',
            center: ['45%', '55%'],
            selectedMode: 'single',
            data: data,
            label: {
              show: true,
              formatter: '{b}: {c} ({d}%)'
            },
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };

      this.chart.setOption(option);

    this.chart2 = echarts.init(document.getElementById('myChart2'));

    // 计算每种难度的数量
    const difficultyCounts = this.paperQuestions.reduce((acc, item) => {
      acc[item.difficultLevel] = (acc[item.difficultLevel] || 0) + 1;
      return acc;
    }, {});

    // 将计算结果转换为 ECharts 数据格式
    const data2 = Object.keys(difficultyCounts).map(difficultLevel => {
      return { value: difficultyCounts[difficultLevel], name: difficultLevel };
    });

    const option2 = {
      title: {
        text: '题目难度占比图:',
        left: 'left'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        type: 'scroll',
        orient: 'vertical',
        right: 0,
        top: 'center',
        icon: 'circle',
        selectedMode: 'multiple',
        formatter: (name) => {
          let total = data2.reduce((sum, item) => sum + item.value, 0);
          let item = data2.find(item => item.name === name);
          let p = (item.value / total * 100).toFixed(2);
          return `${name}  |  ${p}%`;
        }
      },
      series: [
        {
          name: '题目难度占比',
          type: 'pie',
          radius: '60%',
          center: ['45%', '55%'],
          selectedMode: 'single',
          data: data2,
          label: {
            show: true,
            formatter: '{b}: {c} ({d}%)'
          },
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };

    this.chart2.setOption(option2);

    window.addEventListener('resize', () => {
      this.chart.resize();
      this.chart2.resize();
    });
      });
    },
  handlePageChange(page) {
      console.log('Page changed to:', page); // 日志记录当前页码
      this.currentPage = page;
      this.dict['pageNum'] = this.currentPage;
      this.fetchExams(this.dict); // 触发 Vuex action 以获取新页数据
  },
  },
  mounted() {
    console.log("fetch exam", this.dict)
    this.fetchExams(this.dict);
    this.fetchExamPages(this.dict['kind']);
  }
};
</script>



<style scoped>
.container {
  flex: 1;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: auto;
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
.el-button{
  /* 增加按钮间距 */
  margin-left: 12px;
}
.demo-range .el-date-editor {
  margin: 8px;
}

.demo-range .el-range-separator {
  box-sizing: content-box;
}
.el-button-group {
  display: flex;
  flex-wrap: nowrap;
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

/* button {
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
} */

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
</style>