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
  const [active, setActive] = useState(false);

  useEffect(() => {
    BoardService.findOne(Number(id)).then((res) => {
      setPost(res);
      setActive(res.text ? false : true);
    });
  }, []);

  const title = (post.relevel ? "[Re] " : "") + post.title;
  const reply = post.relevel ? `원글에서 ${post.relevel} - ${post.recnt}번째 덧글` : "덧글 X";

  return (
    <Container>
      <button type="button" className="btn btn-outline-success m-2" onClick={(e) => navigate("/board")}>
        목록
      </button>
      <button type="button" className="btn btn-outline-success m-2" onClick={(e) => navigate(`/edit/${id}`)}>
        수정
      </button>
      <button type="button" className="btn btn-outline-success m-2" onClick={(e) => navigate(`/reply/${id}`)} disabled={active}>
        덧글
      </button>
      <Table bordered striped="columns" className="m-3">
        <tbody>
          <tr>
            <td className="text-center" style={{ width: 20 + "%" }}>
              번호
            </td>
            <td>{post.id}</td>
          </tr>
          <tr>
            <td className="text-center">제목</td>
            <td>{post.title}</td>
          </tr>
          <tr>
            <td className="text-center">일자</td>
            <td>
              <Moment date={post.date} format="YYYY-MM-DD" />
            </td>
          </tr>
          <tr>
            <td className="text-center">작성자</td>
            <td>{post.editer}</td>
          </tr>
          <tr>
            <td className="text-center">조회수</td>
            <td>{post.viewCnt}</td>
          </tr>
          <tr>
            <td className="text-center">덧글수준</td>
            <td>{reply}</td>
          </tr>
          <tr>
            <td className="text-center">내용</td>
            <td dangerouslySetInnerHTML={{ __html: post.text }}></td>
          </tr>
        </tbody>
      </Table>
      <Comment active={post.text ? "" : "none"} />
      <AddComment active={post.text ? "" : "none"} />
    </Container>
  );
}

export default View;
