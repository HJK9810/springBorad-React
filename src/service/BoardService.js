import Axios from "../Axios";

class BoardService {
  findAll(page = 0, size = 10) {
    return Axios.get(`/postApi/list?page=${page}&size=${size}&sort=id,desc`).then((res) => res.data);
  }

  findOne(id = 1) {
    return Axios.get(`/postApi/One/${id}`).then((res) => res.data);
  }

  async inputData(form) {
    return await Axios.post("/postApi/add", form);
  }

  getData(id = 1) {
    return Axios.get(`/postApi/edit/${id}`).then((res) => res.data);
  }

  async editData(form) {
    return await Axios.post(`/postApi/edit/${form.id}`, form);
  }

  async deletData(id = 1) {
    return await Axios.delete(`/postApi/del/${id}`);
  }

  showComments(id = 1, page = 0) {
    return Axios.get(`/postApi/comment/${id}?page=${page}&size=5&sort=id,desc`).then((res) => res.data);
  }

  async addComments(id = 1, form) {
    return await Axios.post(`/postApi/comment/${id}`, form);
  }

  async delComments(id = 1, cid = 1) {
    return await Axios.delete(`/postApi/comment/${id}?id=${cid}`);
  }
}

export default new BoardService();
