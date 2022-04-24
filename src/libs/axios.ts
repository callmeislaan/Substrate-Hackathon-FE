import axios from "axios";
import { jwtService } from "@/services/auth/jwt.service";

// const baseURL = "http://anestbe-env.eba-zxp2t2um.ap-southeast-1.elasticbeanstalk.com";
// const baseURL = "http://awseb-e-v-awsebloa-gplgvtpipfyo-1294360352.ap-southeast-1.elb.amazonaws.com"; //LB

const baseURL = "http://localhost:8080";

// ALL DEFAULT CONFIGURATION HERE
export const anestAxios = axios.create({
  baseURL
});

// request interceptor
anestAxios.interceptors.request.use(
  config => {
    const token = jwtService.getToken();
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  error => {
    Promise.reject(error);
  }
);
