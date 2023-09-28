import React from "react";
import { Routes, Route } from "react-router-dom";
import classes from "./App.module.scss";
import { Board, Task } from "./pages";
import Layout from "./layout/Layout";
//import { DataBoard, DataComment, DataFile, DataColumn,DataTask } from './data-type/type';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/Board" element={<Board />} />
        {/* private router task */}
        <Route path="/Board/:id/tasks" element={<Task />} />
      </Route>
    </Routes>
  );
}

export default App;
