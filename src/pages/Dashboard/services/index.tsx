import apiService from "../../../services/index";

const QuizService = {
  // getAllQuiz(_page: any, _limit: any) {
  //   return apiService.get(`/quiz?_page=${_page}&_limit=${ }`);
  // },
  getAll() {
    return apiService.get(`/quiz`);
  },
  getAllQuiz(params: any) {
    return apiService.get(`/quiz`, { params });
  },
  // getAllQuiz(_page: any, _limit: any, difficulty?: any, title?: any) {
  //   return apiService.get(
  //     `/quiz?_page=${_page}&_limit=${_limit}&difficulty=${difficulty}&title=${title}`
  //   );
  // },
};

export default QuizService;
