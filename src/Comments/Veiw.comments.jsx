import { Table } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import BoardService from "../service/BoardService";
import { useParams } from "react-router-dom";

function Comment() {
  const [post, setPost] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    BoardService.showComments(Number(id)).then((res) => setPost(res));
  }, []);

  const handleDelete = async (event) => {
    const cid = event.target.getAttribute("data-msg");
    await BoardService.delComments(id, cid);
    window.location.reload();
  };

  return (
    <Table striped bordered className="m-3 mb-0">
      <thead>
        <tr className="text-center">
          <th style={{ width: 20 + "%" }}>작성자</th>
          <th>댓글</th>
        </tr>
      </thead>
      <tbody>
        {post.map((p) => (
          <tr key={p.id}>
            <td className="text-center">{p.editer}</td>
            <td className="d-flex justify-content-between align-items-center">
              {p.comment}
              <button type="button" className="btn btn-outline-warning" size="sm" data-msg={p.id} onClick={handleDelete}>
                삭제
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default Comment;
