import BoardService from "../service/BoardService";
import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "./Pagination.screen";
import Moment from "react-moment";

function Board() {
  const [post, setPost] = useState([]);
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    BoardService.findAll(page, 10).then((res) => {
      setPost(res.content);
      setPagination({ number: res.number, totalPages: res.totalPages, first: res.first, last: res.last });
    });
  }, [page]);

  return (
    <Container>
      <button type="button" className="btn btn-outline-success m-2" onClick={(e) => navigate("/add")}>
        등록
      </button>
      <Table striped bordered hover className="m-3 table">
        <thead>
          <tr className="text-center">
            <th style={{ width: 10 + "%" }}>#</th>
            <th>title</th>
            <th style={{ width: 15 + "%" }}>작성자</th>
            <th style={{ width: 15 + "%" }}>조회수</th>
            <th style={{ width: 20 + "%" }}>Date</th>
          </tr>
        </thead>
        <tbody>
          {post.map((p) => (
            <tr key={p.id}>
              <td className="text-center">{p.id}</td>
              <td className="d-flex justify-content-between align-items-center">
                <Link to={`/view/${p.id}`}>{p.title}</Link>
                <span className="badge bg-success rounded-pill ">{p.comentCnt}</span>
              </td>
              <td className="text-center">{p.editer}</td>
              <td className="text-center">{p.viewCnt}</td>
              <td className="text-center">
                <Moment date={p.date} format="YYYY-MM-DD" />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="d-flex justify-content-center">
        <Pagination pagination={pagination} setPage={(p) => setPage(p)} />
      </div>
    </Container>
  );
}

export default Board;
