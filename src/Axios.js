import axios from "axios";

const Axios = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "content-type": "application/json;charset=utf-8",
  },
  withCredentials: true,
});

export default Axios;
