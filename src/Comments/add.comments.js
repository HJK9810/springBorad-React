import { Form, Col, Row, FloatingLabel } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BoardService from "../service/BoardService";

function AddComment() {
  const [post, setPost] = useState([]);
  const { id } = useParams();

  const [editer, setEditer] = useState("");
  const [comment, setComment] = useState("");
  const [validated, setValidated] = useState(false);

  const handleEditerChange = (event) => setEditer(event.target.value);
  const handleTextChange = (event) => setComment(event.target.value);

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      const formBody = {
        editer: editer,
        comment: comment,
      };
      setValidated(true);
      await BoardService.addComments(id, formBody);
    }
  };

  return (
    <Form validated={validated} className="m-3 mt-0">
      <Row className="align-items-center">
        <Col sm={3} className="my-1">
          <Form.Floating controlId="floatingText" label="작성자" className="mb-3">
            <Form.Control type="text" onChange={handleEditerChange} required />
            <Form.Control.Feedback type="invalid">작성자를 입력해 주세요.</Form.Control.Feedback>
          </Form.Floating>
        </Col>
        <Col sm={8} className="my-1">
          <Form.Floating controlId="floatingTextarea" label="댓글" className="mb-3">
            <Form.Control as="textarea" style={{ resize: "none" }} onChange={handleTextChange} required />
            <Form.Control.Feedback type="invalid">댓글을 입력해 주세요.</Form.Control.Feedback>
          </Form.Floating>
        </Col>
        <Col xs="auto" className="my-1">
          <button type="submit" className="btn btn-outline-primary" onClick={handleSubmit}>
            등록
          </button>
        </Col>
      </Row>
    </Form>
  );
}

export default AddComment;
