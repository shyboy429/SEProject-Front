/* eslint-disable no-unused-vars */

import { createStore } from 'vuex';
import axios from 'axios';

// 设置 Axios 基地址
axios.defaults.baseURL = 'http://localhost:8181';

const store = createStore({
  state: {
    questions: [], // 存储题目列表
    paperQuestions: [],
    paper: [],
    papers: [],
    exams: [], // 存储考试列表
    question:[],
    user: null, // 存储当前登录用户
  },
  mutations: {
    // 设置题目列表
    setPapers(state, papers) {
      state.papers = papers;
    },
    addPaper(state, paper) {
      state.papers.push(paper);
      state.paper = []
    },
    removePaper(state, paperId) {
      state.papers = state.papers.filter(paper => paper.id !== paperId);
    },

    addQuestionToPaper(state, question) {
      console.log("hello");
      // if (!state.paper.includes(question)) {
        state.paper.push(question);
      // }
    },
    removeQuestionFromPaper(state, questionId) {
      console.log("hh");
      state.paper = state.paper.filter(item => item.id !== questionId);
    },
    
    setPaperQuestions(state, questions){
      state.paperQuestions = questions;
    },
    // 设置题目列表
      setQuestion(state, question) {
          state.question = [];
      state.question.push(question);
    },
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
    },
    add(){

    }
  },
  actions: {
    removeFromPaper({ commit }, id) {
      commit('removeQuestionFromPaper', id);
    },
    async deletePaper({commit}, PaperID){
      try {
        // console.log(id);
        console.log('update');
        const response = await axios.delete('/api/papers/'+PaperID);
        const response2 = await axios.get('/api/papers');
        commit('setPapers', response2.data);
        commit('add');
      } catch (error) {
        // 请求失败时，直接添加传入的数据到题目列表
        commit('add');
      }
    },
    async updatePaperQuestions({commit}, dict){
      try {
        // console.log(id);
        console.log('update');
        const response = await axios.post('/api/papers/'+dict.paperid+'/question/'+dict.questionid);
        commit('setPaperQuestions', response.data);
        const response2 = await axios.get('/api/papers');
        commit('setPapers', response2.data);
        commit('add');
      } catch (error) {
        // 请求失败时，直接添加传入的数据到题目列表
        commit('add');
      }
    },
    async deleteQuestion({commit}, id){
      try {
        console.log(id);
        console.log('delete');
        const response = await axios.delete('/api/questions/'+id);
        const response2= await axios.get('/api/questions');
        commit('setQuestions', response2.data);
        commit('add');
      } catch (error) {
        // 请求失败时，直接添加传入的数据到题目列表
        commit('add');
      }
    },
    async updateQuestion({commit}, form) {
      try {
        console.log(form.id);
        const response = await axios.post('/api/questions/'+form.id, form.question);
        
        commit('add');
      } catch (error) {
        // 请求失败时，直接添加传入的数据到题目列表
        commit('add');
      }
    },

    async fetchPaperQuestion({ commit}, id){
      try {
        const response = await axios.get('/api/papers/admin/'+id);
        commit('setPaperQuestions', response.data);
      } catch (error) {
        // 请求失败时，设置空数据
        commit('setPaperQuestions', []);
      }
    },

    // 获取paper列表
    async fetchPapers({ commit }) {
      try {
        const response = await axios.get('/api/papers');
        commit('setPapers', response.data);
      } catch (error) {
        // 请求失败时，设置空数据
        commit('setPapers', []);
      }
    },
    // 获取题目列表
    async fetchFileteredQuestion({ commit }, id) {
      try {
  
        const response = await axios.get(`/api/questions/`+id);
        commit('setQuestion', response.data); // Assuming you have a Vuex store
      } catch (error) {
        // Handle request failure
        commit('setQuestion', []);
      }
    },
    // 获取题目列表
    async fetchFileteredQuestions({ commit }, params) {
      try {
        // Construct query string from params
        const queryString = Object.keys(params)
          .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
          .join('&');
  
        const response = await axios.get(`/api/questions/search?${queryString}`);
        commit('setQuestions', response.data); // Assuming you have a Vuex store
      } catch (error) {
        // Handle request failure
        commit('setQuestions', []);
      }
    },
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
    async addPaper({ commit }, paper) {
      try {
        const response = await axios.post('/api/papers', paper);
        // commit('addPaper', response.data);
        return {success:"success"};
      } catch (error) {
        // 请求失败时，直接添加传入的数据到题目列表
        // commit('addPaper', paper);
        return {success:"error"};
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
        const response = await axios.post('/api/users/login', credentials);
        commit('setUser', response.data);
        return { success: true };
      } catch (error) {
        return { success: false, message: error.response ? error.response.data.message : '网络错误' };
      }
    }
  }
});

export default store;
