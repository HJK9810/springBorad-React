import { Table } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import BoardService from "../service/BoardService";
import { useParams } from "react-router-dom";
import Pagination from "../screen/Pagination.screen";

function Comment(props) {
  const [post, setPost] = useState([]);
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(0);
  const { id } = useParams();

  useEffect(() => {
    BoardService.showComments(Number(id), page).then((res) => {
      setPost(res.content);
      setPagination({ number: res.number, totalPages: res.totalPages, first: res.first, last: res.last, size: "sm" });
    });
  }, [page]);

  const handleDelete = async (event) => {
    const cid = event.target.getAttribute("data-msg");
    await BoardService.delComments(id, cid);
    window.location.reload();
  };

  return (
    <>
      <Table striped bordered className="m-3">
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
                <button type="button" className="btn btn-outline-warning" size="sm" data-msg={p.id} onClick={handleDelete} disabled={props.active === "none" ? true : false}>
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="d-flex justify-content-center">
        <Pagination pagination={pagination} setPage={(p) => setPage(p)} />
      </div>
    </>
  );
}

export default Comment;
