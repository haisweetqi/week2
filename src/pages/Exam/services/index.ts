import apiService from "../../../services/index";

const ExamService = {
  getExamId(id: any) {
    return apiService.get(`/quiz/${id}`);
  },
};

export default ExamService;
