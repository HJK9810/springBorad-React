import Axios from "../Axios";

class BoardService {
  findAll(page = 0, size = 10) {
    return Axios.get(`/postApi/list?page=${page}&size=${size}&sort=id,desc`).then((res) => res.data);
  }
}

export default new BoardService();
