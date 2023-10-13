import React from "react";
import { Routes, Route } from "react-router-dom";
import { Board, Columns } from "./pages";
import Layout from "./layout/Layout";
import TextEditor from "./pages/Details/components/TextEditor/TextEditor";
//import { DataBoard, DataComment, DataFile, DataColumn,DataTask } from './data-type/type';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/board" element={<Board />} />
        {/* private router task */}
        {/*     <Route path="/board/:id" element={<Tasks />} /> */}
        <Route path="/board/:id" element={<Columns />} />
      </Route>
    </Routes>
  );
}

export default App;
