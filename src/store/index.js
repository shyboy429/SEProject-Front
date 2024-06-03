/* eslint-disable no-unused-vars */

import { createStore } from 'vuex';
import axios from 'axios';

// 设置 Axios 基地址
axios.defaults.baseURL = 'http://localhost:8181';

const store = createStore({
  state: {
    questions: [], // 存储题目列表
    exams: [], // 存储考试列表
    user: null, // 存储当前登录用户
  },
  mutations: {
    // 设置题目列表
    setQuestions(state, questions) {
      state.questions = questions;
    },
    // 添加新题目
    addQuestion(state, question) {
      state.questions.push(question);
    },
    // 设置考试列表
    setExams(state, exams) {
      state.exams = exams;
    },
    // 添加新考试
    addExam(state, exam) {
      state.exams.push(exam);
    },
    // 设置当前用户
    setUser(state, user) {
      state.user = user;
    }
  },
  actions: {
    // 获取题目列表
    async fetchQuestions({ commit }) {
      try {
        const response = await axios.get('/api/questions');
        commit('setQuestions', response.data);
      } catch (error) {
        // 请求失败时，设置空数据
        commit('setQuestions', []);
      }
    },
    // 添加新题目
    async addQuestion({ commit }, question) {
      try {
        const response = await axios.post('/api/questions', question);
        commit('addQuestion', response.data);
      } catch (error) {
        // 请求失败时，直接添加传入的数据到题目列表
        commit('addQuestion', question);
      }
    },
    // 获取考试列表
    async fetchExams({ commit }) {
      try {
        const response = await axios.get('/api/exams');
        commit('setExams', response.data);
      } catch (error) {
        // 请求失败时，设置空数据
        commit('setExams', []);
      }
    },
    // 创建新考试
    async createExam({ commit }, exam) {
      try {
        const response = await axios.post('/api/exams', exam);
        commit('addExam', response.data);
      } catch (error) {
        // 请求失败时，直接添加传入的数据到考试列表
        commit('addExam', exam);
      }
    },
    // 提交考试
    async submitExam(_, { examId, answers }) {
      try {
        await axios.post(`/api/exams/${examId}/submit`, { answers });
      } catch (error) {
        // 提交失败时，暂时不做处理
      }
    },
    // 用户登录
    async login({ commit }, credentials) {
      try {
        const response = await axios.post('/api/login', credentials);
        commit('setUser', response.data.user);
        return { success: true };
      } catch (error) {
        return { success: false, message: error.response ? error.response.data.message : '网络错误' };
      }
    }
  }
});

export default store;
