import axios from 'axios'
import { queryClient } from "../main";


const API_URL = 'http://localhost:5000/api'

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
    ,withCredentials: true
})


api.interceptors.response.use(
    (res) => res,
    (error) => {
      if (error.response?.status === 401) {
        if (localStorage.getItem("user")) {
          localStorage.removeItem("user");
          queryClient.removeQueries(["user"]);
          window.location.href = "/login";
        }
      }
      return Promise.reject(error);
    }
  );

export default api
