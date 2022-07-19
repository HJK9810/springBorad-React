import { Table, Container, Form, Col } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import BoardService from "../service/BoardService";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";

function Edit() {
  const [post, setPost] = useState([]);
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [editer, setEditer] = useState(post.editer);
  const [content, setContent] = useState("");

  useEffect(() => {
    BoardService.getEditData(Number(id)).then((res) => {
      setPost(res);
      setTitle(res.title);
      setContent(res.content);
    });
  }, []);

  const navigate = useNavigate();
  const date = moment().format("YYYY-MM-DD");
  const [validated, setValidated] = useState(false);

  const handleTitleChange = (event) => setTitle(event.target.value);
  const handleEditerChange = (event) => setEditer(event.target.value);
  const handleTextChange = (event) => setContent(event.target.value);

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      const formBody = {
        id: id,
        editer: editer,
        title: title,
        content: content,
      };
      setValidated(true);
      await BoardService.editData(formBody);
      navigate(`/view/${id}`);
    }
  };

  const handleDelete = async (event) => {
    await BoardService.deletData(id);
    navigate("/board");
  };

  return (
    <Container>
      <Form validated={validated}>
        <button type="button" className="btn btn-outline-info m-2" onClick={(e) => (window.location.href = "/board")}>
          목록
        </button>
        <button type="button" className="btn btn-outline-info m-2" onClick={handleSubmit}>
          수정
        </button>
        <button type="button" className="btn btn-outline-warning m-2" onClick={handleDelete}>
          삭제
        </button>
        <Table striped="columns" className="m-3">
          <tbody>
            <tr>
              <td style={{ width: 20 + "%" }}>번호</td>
              <td>{post.id}</td>
            </tr>
            <tr>
              <td>제목</td>
              <td>
                <Form.Group as={Col} md="256" controlId="title">
                  <Form.Control type="text" placeholder="title" defaultValue={post.title} onChange={handleTitleChange} required />
                  <Form.Control.Feedback type="invalid">제목을 입력해 주세요.</Form.Control.Feedback>
                </Form.Group>
              </td>
            </tr>
            <tr>
              <td>일자</td>
              <td>{date}</td>
            </tr>
            <tr>
              <td>작성자</td>
              <td>
                <Form.Group as={Col} md="256" controlId="editer">
                  <Form.Control type="text" defaultValue={post.editer} onChange={handleEditerChange} required />
                </Form.Group>
              </td>
            </tr>
            <tr>
              <td>내용</td>
              <td>
                <Form.Group controlId="content">
                  <Form.Control as="textarea" defaultValue={post.text} rows={10} onChange={handleTextChange} style={{ resize: "none" }} required />
                </Form.Group>
              </td>
            </tr>
          </tbody>
        </Table>
      </Form>
    </Container>
  );
}

export default Edit;
