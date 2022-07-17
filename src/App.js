import React from "react";
import "./App.scss";
import axios from "axios";
import Layout from "./Layout/Layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Board from "./screen/Board.screen";
import Main from "./screen/Main.screen";
import View from "./screen/View.screen";
import Add from "./screen/Add.screen";
import Edit from "./screen/Edit.screen";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/board" element={<Board />}></Route>
          <Route path="/view/:id" element={<View />}></Route>
          <Route path="/add" element={<Add />}></Route>
          <Route path="/eidt" element={<Edit />}></Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
