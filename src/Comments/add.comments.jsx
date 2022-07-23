import { Form, InputGroup, Table } from "react-bootstrap";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import BoardService from "../service/BoardService";

function AddComment(props) {
  const { id } = useParams();

  const [editer, setEditer] = useState("");
  const [comment, setComment] = useState("");
  const [validated, setValidated] = useState(false);

  const handleEditerChange = (event) => setEditer(event.target.value);
  const handleTextChange = (event) => setComment(event.target.value);

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() == false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      const formBody = {
        editer: editer,
        comment: comment,
      };
      console.log(formBody);
      setValidated(true);
      await BoardService.addComments(id, formBody);
    }
  };

  return (
    <Form noValidate validated={validated} className="m-3 mt-0">
      <Table className="m-0">
        <tbody>
          <tr>
            <td style={{ width: 20 + "%" }}>
              <Form.Control placeholder="작성자" type="text" onChange={handleEditerChange} required />
              <Form.Control.Feedback type="invalid">작성자를 입력해 주세요.</Form.Control.Feedback>
            </td>
            <td>
              <InputGroup>
                <Form.Control placeholder="댓글" onChange={handleTextChange} required />
                <Form.Control.Feedback type="invalid">댓글을 입력해 주세요.</Form.Control.Feedback>
                <button type="submit" className="btn btn-outline-primary" onClick={handleSubmit} disabled={editer === "" || comment === "" || props.active === "none" ? true : false}>
                  등록
                </button>
              </InputGroup>
            </td>
          </tr>
        </tbody>
      </Table>
    </Form>
  );
}

export default AddComment;
