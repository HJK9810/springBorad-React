import { Table, Container, Form, Col } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import BoardService from "../service/BoardService";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function Edit() {
  const [post, setPost] = useState([]);
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [editer, setEditer] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    BoardService.getData(Number(id)).then((res) => {
      setPost(res);
      setTitle(res.title);
      setEditer(res.editer);
      setText(res.text);
    });
  }, []);

  const navigate = useNavigate();
  const date = moment().format("YYYY-MM-DD");
  const [validated, setValidated] = useState(false);

  const handleTitleChange = (event) => setTitle(event.target.value);
  const handleEditerChange = (event) => setEditer(event.target.value);

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
        text: text,
      };
      setValidated(true);
      await BoardService.editData(formBody);
      navigate(`/view/${id}`);
    }
  };

  const handleDelete = async (event) => {
    if (post.relevel) {
      const formBody = {
        id: id,
        title: "(해당 덧글은 삭제된 덧글입니다.)",
        content: null,
      };
      await BoardService.editData(formBody);
      navigate("/board");
    } else {
      await BoardService.deletData(id);
      navigate("/board");
    }
  };

  return (
    <Container>
      <Form validated={validated}>
        <button type="button" className="btn btn-outline-info m-2" onClick={(e) => navigate("/board")}>
          취소
        </button>
        <button type="button" className="btn btn-outline-info m-2" onClick={handleSubmit} disabled={editer === "" || title === "" ? true : false}>
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
                <CKEditor
                  editor={ClassicEditor}
                  data={text}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setText(data);
                  }}
                />
              </td>
            </tr>
          </tbody>
        </Table>
      </Form>
    </Container>
  );
}

export default Edit;
