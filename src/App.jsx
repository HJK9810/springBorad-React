import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import Layout from "./Layout/Layout";
import Board from "./screen/Board.screen";
import Main from "./screen/Main.screen";
import View from "./screen/View.screen";
import Add from "./screen/Add.screen";
import Edit from "./screen/Edit.screen";
import Reply from "./screen/Reply.screen";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route exact path="/" element={<Main />}></Route>
            <Route path="/board" element={<Board />}></Route>
            <Route path="/view/:id" element={<View />}></Route>
            <Route path="/add" element={<Add />}></Route>
            <Route path="/edit/:id" element={<Edit />}></Route>
            <Route path="/reply/:id" element={<Reply />}></Route>
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
