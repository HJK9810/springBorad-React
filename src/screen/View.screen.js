import { Table, Container } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import BoardService from "../service/BoardService";
import { useParams } from "react-router-dom";

function View() {
  const [post, setPost] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    BoardService.findOne(Number(id)).then((res) => setPost(res));
  }, [post]);

  return (
    <Container>
      <button type="button" className="btn btn-outline-success m-2" onClick={(e) => (window.location.href = "/board")}>
        목록
      </button>
      <button type="button" className="btn btn-outline-success m-2" onClick={(e) => (window.location.href = "#")}>
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
            <td>내용</td>
            <td>{post.text}</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
}

export default View;
