/* eslint-disable no-unused-vars */

import { createStore } from 'vuex';
import axios from 'axios';

// 设置 Axios 基地址
axios.defaults.baseURL = 'http://localhost:8181';

const store = createStore({
  state: {
    questions: [], // 存储题目列表
    paperQuestions: [],
    examQuestions: [],
    examAnswers: {},
    paper: [],
    papers: [],
    examInfo: null,
    exams: [], // 存储考试列表
    question:[],
    questionsPages:1,
    papersPages:1,
    examsPages:1,
    totalCount2:0,
    user: null, // 存储当前登录用户
  },
  mutations: {
    setExamAnswer(state, { questionId, answer }) {
      state.examAnswers[questionId] = answer;
    },

    // 设置题目列表
    setPapers(state, papers) {
      state.papers = papers;
    },
    setExams(state, exams) {
      state.exams = exams;
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
    setExamQuestions(state, questions){
      state.examQuestions = questions;
    },
    setExamInfo(state, row){
      state.examInfo = row;
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
    // setExams(state, exams) {
    //   state.exams = exams;
    // },
    // 添加新考试
    addExam(state, exam) {
      state.exams.push(exam);
    },
    // 设置当前用户
    setUser(state, user) {
      state.user = user;
    },
    setQuestionsPages(state, pagenum){
      state.questionsPages = pagenum;
    },
    setPapersPages(state, pagenum){
      state.papersPages = pagenum;
    },
    setExamsPages(state, pagenum){
      state.examsPages = pagenum;
    },
    add(){

    }
  },
  actions: {
    removeFromPaper({ commit }, id) {
      commit('removeQuestionFromPaper', id);
    },
    async submitExamAnswer({commit}, answer){
      try {
        // console.log(id);
        // console.log('update');
        let postData = [];
        console.log("info:",this.state.examInfo)
        // 遍历 answer 对象，构建每个题目的数据格式
        Object.keys(answer).forEach(questionId => {
          let data = {
            id: "",  // 通常是提交后服务器返回的答案记录的唯一标识符
            studentName: this.state.user.username,  // 学生姓名，这里可以根据实际情况传入
            examId: this.state.examInfo.examId,  // 考试的唯一标识符
            questionId: questionId,  // 题目的唯一标识符，对应数据库中的Id
            studentAnswer: answer[questionId],  // 学生的答案，根据传入的 answer 对象取值
            grade: "0"  // 初始分数为0，如果需要评分功能可以后续修改
          };
          postData.push(data);
        });
        console.log(postData);
        const response = await axios.post('/api/answer-record/submit-answer', postData);
        // const response2 = await axios.get('/api/papers');
        // commit('setPapers', response2.data);
        // commit('add');
      } catch (error) {
        // 请求失败时，直接添加传入的数据到题目列表
        // commit('add');
      }
    },
    async deletePaper({commit}, PaperID){
      try {
        // console.log(id);
        console.log('update');
        const response = await axios.delete('/api/papers/'+PaperID);
        // const response2 = await axios.get('/api/papers');
        // commit('setPapers', response2.data);
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
        // const response2 = await axios.get('/api/papers');
        // commit('setPapers', response2.data);
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
        // const response2= await axios.get('/api/questions');
        // commit('setQuestions', response2.data);
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

    async fetchExamQuestion({ commit}, id){
      try {
        console.log("id:",id);
        const response = await axios.get('/api/papers/exam-paper/'+id[0]);
        // var d2 = {};
        // d2['id'] = response.data['questionId'];
        // d2['type'] = response.data['questionType'];
        // d2['description'] = response.data['specificContent'];
        commit('setExamQuestions', response.data);
        console.log("rrrrrrrrrrrr:", id[1]);
        commit('setExamInfo', id[1]);
        console.log('examInfo:', this.state.examInfo);
        this.state.totalCount2 = response.data.length;
      } catch (error) {
        // 请求失败时，设置空数据
        commit('setExamQuestions', []);
      }
    },
    // 获取paper列表
    async fetchPapers({ commit }, pageNum) {
      try {
        var response;
        if (pageNum!==undefined){
          response = await axios.get('/api/papers?pageNum='+ pageNum);
        }else {
          response = await axios.get('/api/papers');
        }
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
        // commit('setQuestions', response.data); // Assuming you have a Vuex store
        commit('setQuestionsPages', response.data.length);
      } catch (error) {
        // Handle request failure
        // commit('setQuestions', []);
      }
    },
    // 获取题目列表
    async fetchQuestions({ commit }, params) {
      try {
        // Construct query string from params
        const queryString = Object.keys(params)
          .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
          .join('&');
  
        const response = await axios.get(`/api/questions/search?${queryString}`);
        commit('setQuestions', response.data); // Assuming you have a Vuex store
        // return (len(response.data));
        
      } catch (error) {
        // Handle request failure
        commit('setQuestions', []);
      }
    },
    // // 获取题目列表
    // async fetchQuestions({ commit }, pageNum) {
    //   try {
    //     var response;
    //     if (pageNum!==undefined){
    //       response = await axios.get('/api/questions/?pageNum='+ pageNum);
    //     }else {
    //       response = await axios.get('/api/questions');
    //     }
        
    //     commit('setQuestions', response.data);
    //   } catch (error) {
    //     // 请求失败时，设置空数据
    //     commit('setQuestions', []);
    //   }
    // },
    async fetchQuestionsPages({ commit }) {
      try {
        const response = await axios.get('/api/questions/pageNum');
        const totalPages = parseInt(response.data, 10); // 将 response.data 转换为整数
        console.log('Fetched questions pages:', totalPages); // 日志记录转换后的整数值
        console.log(response.data);
        commit('setQuestionsPages', response.data);
        console.log('pages:', this.state.questionsPages)
      } catch (error) {
        console.error('Failed to fetch questions pages:', error); // Add log
        commit('setQuestionsPages', 1);
      }
    },
    
    async fetchPapersPages({commit}){
      try {
        const response = await axios.get('/api/papers/pageNum');
        commit('setPapersPages', response.data);
      } catch (error) {
        // 请求失败时，设置空数据
        commit('setPapersPages', 1);
      }
    },
    
    async fetchExamPages({commit},kind){
      try {
        var response;
        if (kind==='all'){
          response = await axios.get('/api/exams/page-num');
        }else if(kind==='unstart'){
          response = await axios.get('/api/exams/not-started/page-num');
        }else if(kind==='pro'){
          response = await axios.get('/api/exams/in-progress/page-num');
        }else if(kind==='end'){
          response = await axios.get('/api/exams/finished/page-num');
        }
        
        commit('setExamsPages', response.data);
      } catch (error) {
        // 请求失败时，设置空数据
        commit('setExamsPages', 1);
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
    // async fetchExams({ commit }) {
    //   try {
    //     const response = await axios.get('/api/exams');
    //     commit('setExams', response.data);
    //   } catch (error) {
    //     // 请求失败时，设置空数据
    //     commit('setExams', []);
    //   }
    // },
    // async fetchExams({ commit }, pageNum) {
    //   try {
    //     var response;
    //     if (pageNum!==undefined){
    //       response = await axios.get('/api/exams?pageNum='+ pageNum);
    //     }else {
    //       response = await axios.get('/api/exams');
    //     }
    //     commit('setExams', response.data);
    //   } catch (error) {
    //     // 请求失败时，设置空数据
    //     commit('setExams', []);
    //   }
    // },

    async fetchExams({ commit }, dict) {
      try {
        console.log('dd', dict)

        var pageNum = dict.pageNum;
        var kind = dict.kind;
        var response;
        if(kind==="all"){
          if (pageNum!==undefined){
            response = await axios.get('/api/exams/student-name?pageNum='+ pageNum);
          }else {
            response = await axios.get('/api/exams');
          }
        }else if(kind==='pro'){
          if (pageNum!==undefined){
            response = await axios.get('/api/exams/student-name/in-progress?pageNum='+ pageNum);
          }else {
            response = await axios.get('/api/exams/student-name/in-progress');
          }
        }else if(kind==='unstart'){
          if (pageNum!==undefined){
            response = await axios.get('/api/exams/student-name/not-started?pageNum='+ pageNum);
          }else {
            response = await axios.get('/api/exams/student-name/not-started');
          }
        }else if(kind==='end'){
          if (pageNum!==undefined){
            response = await axios.get('/api/exams/student-name/finished?pageNum='+ pageNum);
          }else {
            response = await axios.get('/api/exams/student-name/finished');
          }
        }

        commit('setExams', response.data);
      } catch (error) {
        // 请求失败时，设置空数据
        commit('setExams', []);
      }
    },

    async fetchStudentExams({ commit }, dict) {
      try {
        console.log('ddd', dict)

        var pageNum = dict.pageNum;
        var kind = dict.kind;
        var response;
        console.log('dddd', kind)
        if(kind==="all"){
          if (pageNum!==undefined){
            console.log('ddddd', kind)
            response = await axios.get('/api/exams/student-name?pageNum='+ pageNum +'&&studentName='+ this.state.user.username);
            console.log('ddddd', kind)
          }else {
            response = await axios.get('/api/exams'+'?studentName='+ this.state.user.username);
          }
        }else if(kind==='pro'){
          if (pageNum!==undefined){
            response = await axios.get('/api/exams/student-name/in-progress?pageNum='+ pageNum+'&&studentName='+ this.state.user.username);
          }else {
            response = await axios.get('/api/exams/student-name/in-progress'+'?studentName='+ this.state.user.username);
          }
        }else if(kind==='unstart'){
          if (pageNum!==undefined){
            response = await axios.get('/api/exams/student-name/not-started?pageNum='+ pageNum+'&&studentName='+ this.state.user.username);
          }else {
            response = await axios.get('/api/exams/student-name/not-started'+'?studentName='+ this.state.user.username);
          }
        }else if(kind==='end'){
          if (pageNum!==undefined){
            response = await axios.get('/api/exams/student-name/finished?pageNum='+ pageNum+'&&studentName='+ this.state.user.username);
          }else {
            response = await axios.get('/api/exams/student-name/finished'+'?studentName='+ this.state.user.username);
          }
        }

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
        // commit('addExam', response.data);
        return {success:"success"};
      } catch (error) {
        // 请求失败时，直接添加传入的数据到考试列表
        // commit('addExam', exam);
        return {success:"error"};
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
        return { success: true, role: response.data.role};
      } catch (error) {
        return { success: false, message: error.response ? error.response.data.message : '网络错误' };
      }
    }
  },
  getters: {
    getExamQuestions(state) {
      return state.examQuestions;
    },
    getExamAnswer: (state) => (questionId) => {
      return state.examAnswers[questionId];
    },
    getAnsweredCount(state) {
      return Object.keys(state.examAnswers).length;
    }
  }
});

export default store;
