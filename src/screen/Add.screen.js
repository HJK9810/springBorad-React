import { Table, Container, Form, Col, InputGroup, Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import BoardService from "../service/BoardService";
import moment from "moment";
import { useNavigate } from "react-router-dom";

function Add() {
  const [title, setTitle] = useState("");
  const [editer, setEditer] = useState("");
  const [content, setContent] = useState("");
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
              <td>신규(insert)</td>
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
                  <Form.Control type="text" placeholder="editer" onChange={handleEditerChange} required />
                  <Form.Control.Feedback type="invalid">작성자를 입력해 주세요.</Form.Control.Feedback>
                </Form.Group>
              </td>
            </tr>
            <tr>
              <td>내용</td>
              <td>
                <Form.Group controlId="content">
                  <Form.Control as="textarea" rows={10} onChange={handleTextChange} style={{ resize: "none" }} required />
                </Form.Group>
              </td>
            </tr>
          </tbody>
        </Table>
        <button type="button" className="btn btn-outline-secondary m-2" onClick={(e) => (window.location.href = "/board")}>
          목록
        </button>
        <button type="submit" className="btn btn-outline-secondary m-2">
          등록
        </button>
      </Form>
    </Container>
  );
}

export default Add;
