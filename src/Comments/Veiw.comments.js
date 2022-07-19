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
          <tr>
            <td>{p.editer}</td>
            <td>{p.comment}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default Comment;
