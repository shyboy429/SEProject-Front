import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import HomeView from '../views/HomeView.vue';
import Test from '../components/Test.vue';
import ExamManagement from '../components/ExamManagement.vue'
import ExamView from '../views/ExamView.vue'
import ExamPage from '../components/ExamPage.vue';
import OnlineExamView from '../views/OnlineExamView.vue';
import ExamList from '../components/ExamList.vue';
import RegisterView from '../views/RegisterView.vue';
const routes = [
  { path: '/', component: LoginView },
  { path: '/home', component: HomeView },
  // { path: '/question', component: QuestionBankView},
  // { path: '/test', component: ExamPage},
  { path: '/onlinetest', component: OnlineExamView},
  { path: '/test', component: Test},
  { path: '/test4', component: ExamList},
    { path: '/exam', component: ExamView }, 
    {path:'/register',component:RegisterView},
  // { path: '/dashboard', component: DashboardView,
  //   children: [
  //     { path: 'question-bank', component: QuestionBankView },
  //     { path: 'exam-paper', component: ExamPaperView },
  //     { path: 'online-exam', component: OnlineExamView }
  //   ]
  // }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
