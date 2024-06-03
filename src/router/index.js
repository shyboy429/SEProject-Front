import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import DashboardView from '../views/DashboardView.vue';
import QuestionBankView from '../views/QuestionBankView.vue';
import ExamPaperView from '../views/ExamPaperView.vue';
import OnlineExamView from '../views/OnlineExamView.vue';
import HomeView from '../views/HomeView.vue';

const routes = [
  { path: '/', component: LoginView },
  { path: '/home', component: HomeView },
  { path: '/question', component: QuestionBankView},
  { path: '/dashboard', component: DashboardView, 
    children: [
      { path: 'question-bank', component: QuestionBankView },
      { path: 'exam-paper', component: ExamPaperView },
      { path: 'online-exam', component: OnlineExamView }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
