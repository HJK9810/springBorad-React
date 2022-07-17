import { Table, Container, Form, Col } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import BoardService from "../service/BoardService";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";

function Edit() {
  const [post, setPost] = useState([]);
  // const { data } = useParams();

  useEffect(() => {
    setPost(this.state.location.state);
  }, []);
  // console.log(data);
  console.log(post);

  const [title, setTitle] = useState(post.title);
  const [editer, setEditer] = useState(post.editer);
  const [content, setContent] = useState(post.text);
  const navigate = useNavigate();
  const date = moment().format("YYYY-MM-DD");
  const [validated, setValidated] = useState(false);

  const handleTitleChange = (event) => setTitle(event.target.value);
  const handleEditerChange = (event) => setEditer(event.target.value);
  const handleTextChange = (event) => setContent(event.target.value);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      const formBody = {
        title: title,
        editer: editer,
        text: content,
      };
      setValidated(true);
      BoardService.inputData(formBody);
      navigate("/board", { replace: true });
    }
  };

  return (
    <Container>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Table striped="columns" className="m-3">
          <tbody>
            <tr>
              <td style={{ width: 20 + "%" }}>번호</td>
              <td>{post.id}</td>
            </tr>
            <tr>
              <td>제목</td>
              <td>
                {post.title}
                <Form.Group as={Col} md="256" controlId="title">
                  <Form.Control type="text" defaultValue={post.title} onChange={handleTitleChange} required />
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
