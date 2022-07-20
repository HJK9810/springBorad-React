import { Table, Container } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import BoardService from "../service/BoardService";
import { useParams, useNavigate } from "react-router-dom";
import Comment from "../Comments/Veiw.comments";
import AddComment from "../Comments/add.comments";

function View() {
  const [post, setPost] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    BoardService.findOne(Number(id)).then((res) => setPost(res));
  }, []);

  return (
    <Container>
      <button type="button" className="btn btn-outline-success m-2" onClick={(e) => navigate("/board")}>
        목록
      </button>
      <button type="button" className="btn btn-outline-success m-2" onClick={(e) => navigate(`/edit/${id}`)}>
        수정
      </button>
      <Table striped="columns" className="m-3">
        <tbody>
          <tr>
            <td style={{ width: 20 + "%" }}>번호</td>
            <td>{post.id}</td>
          </tr>
          <tr>
            <td>제목</td>
            <td>{post.title}</td>
          </tr>
          <tr>
            <td>일자</td>
            <td>
              <Moment date={post.date} format="YYYY-MM-DD" />
            </td>
          </tr>
          <tr>
            <td>작성자</td>
            <td>{post.editer}</td>
          </tr>
          <tr>
            <td>조회수</td>
            <td>{post.viewCnt}</td>
          </tr>
          <tr>
            <td>내용</td>
            <td>{post.text}</td>
          </tr>
        </tbody>
      </Table>
      <Comment />
      <AddComment />
    </Container>
  );
}

export default View;
