<template>
    <!-- <HeaderNav /> -->
    <div v-if="user && user.role !== 'STUDENT'" class="home">
      <SideBar @show-content="showContent" @show-table="showTable"/>
      <main class="main-content">
        <component :is="currentContent" />
      </main>
    </div>
    <el-dialog v-model="dialogTableVisible" title="角色管理" width="630" style="margin-left:37%">
      <el-table :data="userData" style="width: 100%" border @cell-click="showUnitInput">
            <el-table-column prop="username" label="用户名" width="300">
              <template #default="{ row, column }">
                <!-- <el-input
                  v-if="tableRowEditId === row.id && tableColumnEditIndex === column.id"
                  @blur="blurValueInput(row, column)"
                  @keyup.enter="blurValueInput(row, column)"
                  v-model="row.username"
                /> -->
                <span >{{ row.username }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="role" label="用户权限" width="180">
                <template #default="{ row, column }">
    <el-select
      v-if="tableRowEditId === row.id && tableColumnEditIndex === column.id"
      @change="blurValueInput(row, column)"
      v-model="row.role2"
      placeholder="请选择角色"
    >
      <el-option label="教师" value="教师"></el-option>
      <el-option label="管理员" value="管理员"></el-option>
      <el-option label="学生" value="学生"></el-option>
    </el-select>
    <span v-else>{{row.role2}}</span>
  </template>
            </el-table-column>
            <el-table-column label="操作" width="120" header-align="center">
              <template #default="{ row }">
                <el-button type="primary" link @click="handleSubmit(row)">确定</el-button>
              </template>
            </el-table-column>
          </el-table>
       </el-dialog>
</template>

<script>
import SideBar from '../components/SideBar.vue';
import InputQuestion from '../components/InputQuestion.vue';
import SearchQuestion from '../components/SearchQuestion.vue';
import PaperManagement from '../components/PaperManagement.vue';
import Shouye from '../components/Shouye.vue';
import ExamManagement from '../components/ExamManagement.vue'
import HeaderNav from '../components/HeaderNav.vue';
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';
import { ElMessage } from 'element-plus';

export default {
  name: 'Home',
  // const headerVisible = ref(true),
  components: {
    SideBar,
    InputQuestion,
    SearchQuestion,
    PaperManagement,
    Shouye,
    ExamManagement,
    HeaderNav
  },
  data() {
    return {
      currentContent: null,
      alertMessage: '',
      dialogTableVisible: false,
                  tableRowEditId: null, // 控制可编辑的每一行
      tableColumnEditIndex: null, // 控制可编辑的每一列
    };
  },
  computed: {
    ...mapState(['examQuestions', 'examAnswers', 'examInfo', 'user', 'totalCount2', 'users']),
    userData(){
       return this.users.map(user => ({
        username: user.username,
        role: user.role,
        role2: user.role === 'ADMIN' ? '管理员' :
           user.role === 'TEACHER' ? '教师' :
           user.role === 'STUDENT' ? '学生' :
           ''
        }));
    },
  },
  methods: {
    ...mapActions(['fetchUsers', 'updateUser']),
    showContent(contentType) {
      if (contentType === 'input') {
        this.currentContent = 'InputQuestion';
      } else if (contentType === 'search') {
        this.currentContent = 'SearchQuestion';
      } else if (contentType === 'paper'){
        this.currentContent = 'PaperManagement';
      } else if (contentType === 'shouye'){
        this.currentContent = 'Shouye';
      } else if (contentType === 'exam'){
        this.currentContent = 'ExamManagement';
      }
    },
    showTable(flag) {
      if (flag) {
        this.dialogTableVisible = true
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
    updateRole(row) {
      this.$nextTick(() => {
        this.blurValueInput(row);
      });
    },
    async handleSubmit(row) {
      // console.log(this.questions)
      // console.log('row',row)
      // console.log('row properties:', Object.keys(row));
      // const plainRow = JSON.parse(JSON.stringify(row));
      const newUser = {
        adminName:this.user.username,
        username:row.username,
        role: row.role2 === '管理员' ? 'ADMIN' :
              row.role2 === '教师' ? 'TEACHER' :
              row.role2 === '学生' ? 'STUDENT' :
              row.role // 默认值，如果没有匹配到
      };
      // console.log(this.questions)
      const result = await this.updateUser(newUser);
      if (result.success!=='error'){
          this.success('修改成功');
      } else {
        this.error(result.error);
      }
      // console.log('编辑操作:', index, row);
      // this.success('提交成功');
      // this.queryParams.pageNum = this.currentPage;
      this.fetchUsers();
    },
    roleLabel(role) {
      switch (role) {
        case 'ADMIN':
          return '管理员';
        case 'TEACHER':
          return '教师';
        case 'STUDENT':
          return '学生';
        default:
          return '';
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
    }
  },
  created() {
    if (!this.user||this.user.role==="STUDENT") {
      this.alertMessage = '未登录';
      ElMessage("未登录")
      setTimeout(() => {
        this.$router.push('/');
      }, 2000); // 等待2秒后跳转
    }
  },

  mounted() {
    this.fetchUsers();
  }


};
</script>

<style scoped>
.home {
  display: flex;
  height: 100vh;
  flex: 1;
}

.main-content {
  flex: 1;
  padding: 20px;
  margin-left: 200px;
  overflow: auto;
  display: flex;
  /* background-color: #df1a1a; 设置灰色背景 */
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
</style>
