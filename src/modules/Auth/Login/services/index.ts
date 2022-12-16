import apiService from "../../../../services/index";

const LoginService = {
  loginApi(params: any) {
    return apiService.post("/login", params);
  },
};

export default LoginService;
