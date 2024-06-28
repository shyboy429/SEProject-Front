<template>
    <div class="container">
        <div style="margin-top: 10px">
            <div class="form-row">
                <div class="form-group">
                    <label>考试中心</label>
                </div>
                <div class="form-group" style="margin-left:47%">
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
            </div>
            <el-table :data="tableData" style="width: 100%; margin-left: 3%;">
                <!-- 每一个列，prop为主键，label为文案 -->
                <!-- 索引 -->
                <el-table-column type="index" width="50"></el-table-column>
                <el-table-column prop="name" label="考试名称" width="200" header-align="left"></el-table-column>
                
                <el-table-column prop="startTime" label="开始时间" width="200" header-align="left"></el-table-column>
                <el-table-column prop="endTime" label="结束时间" width="200" header-align="left"></el-table-column>
                    <!-- 客观题分数 -->
                <el-table-column label="客观题分数" width="120" header-align="center" align="center">
                  <template #default="scope">
                    <span v-if="scope.row.answerStatus === '已完成'">{{ scope.row.obj }}</span>
                  </template>
                </el-table-column>

                <!-- 主观题分数 -->
                <el-table-column label="主观题分数" width="120" header-align="center" align="center">
                  <template #default="scope">
                    <span v-if="scope.row.answerStatus === '已完成'">{{ scope.row.sub }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="durationTime" label="限时" width="120" header-align="center" align="center" ></el-table-column>
                <el-table-column label="操作" width="90" header-align="center" :header-cell-style="{ paddingLeft: '0px' }">
                    <template #default="scope">
                    <div style="display: flex; justify-content: space-between;">
                        <el-button size="small" type="primary" :disabled="user.role!=='STUDENT' || scope.row.status!=='进行中' || scope.row.status==='已结束' || scope.row.answerStatus==='已完成' " @click="enterExam(scope.$index, scope.row)">开始考试</el-button>
                        <!-- <el-button size="small" type="primary"  @click="dialogTableVisible = true; queryPaper(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="small" type="danger" :disabled="(user.username !== scope.row.createdBy)&&(user.role!=='ADMIN')" @click="handlePaperDelete(scope.$index, scope.row)">删除</el-button>
                        <el-button size="small" type="info" @click="dialogChartVisible = true; analysis(scope.$index, scope.row); ">试卷分析</el-button> -->
                    </div>
                    </template>
                </el-table-column>
            </el-table>
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



<script>
import { mapActions, mapState } from 'vuex';
import { ElMessage } from 'element-plus';
import * as echarts from 'echarts';
import { ref } from 'vue';

export default {
  name: 'ExamList',
  data() {
    return {
      buttons2: [
        { label: '全部', isActive: true, method: this.getAll}, // 默认第一个按钮为激活状态
        { label: '未开始', isActive: false, method: this.getUnstarted },
        { label: '进行中', isActive: false, method: this.getPro },
        { label: '已结束', isActive: false, method: this.getEnded },
      ],
      currentPage:1,
      dict: {'pageNum':1, 'kind':'all'},
    }
    
  },
  computed: {
      ...mapState(['exams', 'paper', 'paperQuestions', 'user', 'examsPages']),
      totalPages() {
      return this.examsPages ;
    },
    tableData() {
      return this.exams.map(exam => ({
        name: exam.name,
        // introduction: exam.introduction,
        startTime: exam.startTime,
        endTime: exam.endTime,
        durationTime: exam.durationTime,
        paperId: exam.paperId,
        examId: exam.id,
        answerStatus:exam.answerStatus,
        status:exam.status,
        obj:exam.objAndSubGrade[0],
        sub:exam.objAndSubGrade[1]
      }));
    },
  },

  methods: {
    ...mapActions(['fetchStudentExams', 'addPaper', 'fetchExamQuestion', 'addQuestionToPaper', 'removeFromPaper', 'fetchPaperQuestion', 'updatePaperQuestions', 'deletePaper', 'fetchExamPages']),
    getAll(){
      console.log("getall");
      this.dict.kind = 'all';
      this.dict.pageNum = 1;
      this.currentPage = 1;
      this.fetchStudentExams(this.dict);
      this.fetchExamPages(this.dict['kind']);
    },
    getPro(){
      this.dict.kind = 'pro';
      this.dict.pageNum = 1;
      this.currentPage = 1;
      this.fetchStudentExams(this.dict);
      this.fetchExamPages(this.dict['kind']);
    },
    getUnstarted(){
      this.dict.kind = 'unstart';
      this.dict.pageNum = 1;
      this.currentPage = 1;
      this.fetchStudentExams(this.dict);
      this.fetchExamPages(this.dict['kind']);
    },
    getEnded(){
      this.dict.kind = 'end';
      this.dict.pageNum = 1;
      this.currentPage = 1;
      this.fetchStudentExams(this.dict);
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
  handlePageChange(page) {
      console.log('Page changed to:', page); // 日志记录当前页码
      this.currentPage = page;
      this.dict['pageNum'] = this.currentPage;
      this.fetchStudentExams(this.dict); // 触发 Vuex action 以获取新页数据
  },

    async enterExam(index, row){
      const paperId = row.paperId; // 获取 question id
      console.log("row:",row);
      await this.fetchExamQuestion([paperId, row]);
      this.$router.push('/onlinetest');
    },
  },
  mounted() {
      this.fetchStudentExams(this.dict);
      // this.fetchExams();
      this.fetchExamPages(this.dict.kind);
  }
};




</script>

<style scoped>
.form-group {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin: 0 15px;
}
.container {
  flex: 1;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: auto;
  display: flex;
  height: 711px;
  flex-direction: column;
}
.form-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  margin-left: 1px;
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