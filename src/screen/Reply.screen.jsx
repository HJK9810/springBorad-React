import { Table, Container, Form, Col, InputGroup, Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import BoardService from "../service/BoardService";
import moment from "moment";
import { useParams, useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function Reply() {
  const [post, setPost] = useState([]);
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [editer, setEditer] = useState("");
  const [text, setText] = useState("");
  const navigate = useNavigate();
  const date = moment().format("YYYY-MM-DD");
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    BoardService.getData(Number(id)).then((res) => setPost(res));
  }, []);

  const relevel = post.relevel + 1;

  const handleTitleChange = (event) => setTitle(event.target.value);
  const handleEditerChange = (event) => setEditer(event.target.value);

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      const formBody = {
        rootid: post.rootid,
        relevel: relevel,
        editer: editer,
        title: title,
        text: text,
      };
      setValidated(true);
      await BoardService.inputMention(id, formBody);
      navigate("/board");
    }
  };

  return (
    <Container>
      <Form validated={validated}>
        <Table striped="columns" className="m-3">
          <tbody>
            <tr>
              <td style={{ width: 20 + "%" }}>번호</td>
              <td>덧글(insert)</td>
            </tr>
            <tr>
              <td>제목</td>
              <td>
                <Form.Group as={Col} md="256" controlId="title">
                  <Form.Control type="text" placeholder="title" onChange={handleTitleChange} required />
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
                  <Form.Control type="text" onChange={handleEditerChange} required />
                </Form.Group>
              </td>
            </tr>
            <tr>
              <td>내용</td>
              <td>
                <CKEditor
                  editor={ClassicEditor}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setText(data);
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>원글 id</td>
              <td>{id}</td>
            </tr>
            <tr>
              <td>덧글 수준</td>
              <td>{relevel}</td>
            </tr>
          </tbody>
        </Table>
        <button type="button" className="btn btn-outline-secondary m-2" onClick={(e) => navigate(`/view/${id}`)}>
          취소
        </button>
        <button type="button" className="btn btn-outline-secondary m-2" onClick={handleSubmit}>
          등록
        </button>
      </Form>
    </Container>
  );
}

export default Reply;
