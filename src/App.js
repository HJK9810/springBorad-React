import React from "react";
import "./App.scss";
import axios from "axios";
import Layout from "./Layout/Layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Board from "./screen/Board.screen";
import Main from "./screen/Main.screen";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/board" element={<Board />}></Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
