import BoardService from "../service/BoardService";
import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import Pagination from "./Pagination.screen";
import Moment from "react-moment";
import { Link } from "react-router-dom";

function Board() {
  const [post, setPost] = useState([]);
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(0);

  useEffect(() => {
    BoardService.findAll(page, 10).then((res) => {
      setPost(res.content);
      setPagination({ number: res.number, totalPages: res.totalPages, first: res.first, last: res.last });
    });
  }, [page]);

  return (
    <Container>
      <Table striped bordered hover className="m-3 table">
        <thead>
          <tr className="text-center">
            <th style={{ width: 10 + "%" }}>#</th>
            <th>title</th>
            <th style={{ width: 20 + "%" }}>작성자</th>
            <th style={{ width: 20 + "%" }}>Date</th>
          </tr>
        </thead>
        <tbody>
          {post.map((p) => (
            <tr key={p.id}>
              <td className="text-center">{p.id}</td>
              <td>
                <Link to={"/view/" + p.id}>{p.title}</Link>
              </td>
              <td className="text-center">{p.editer}</td>
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
