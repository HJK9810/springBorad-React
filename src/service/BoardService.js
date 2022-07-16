import Axios from "../Axios";

class BoardService {
  findAll(page = 0, size = 10) {
    return Axios.get(`/postApi/list?page=${page}&size=${size}&sort=id,desc`).then((res) => res.data);
  }

  findOne(id = 1) {
    return Axios.get(`/postApi/One/${id}`).then((res) => res.data);
  }

  inputData(form) {
    return Axios.post("/postApi/add", form);
  }
}

export default new BoardService();
