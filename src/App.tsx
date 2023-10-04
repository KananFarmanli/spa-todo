import React from 'react';
import { Routes, Route } from 'react-router-dom';
import classes from './App.module.scss';
import { Board, Tasks } from './pages';
import Layout from './layout/Layout';
//import { DataBoard, DataComment, DataFile, DataColumn,DataTask } from './data-type/type';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/board" element={<Board />} />
        {/* private router task */}
    {/*     <Route path="/board/:id" element={<Tasks />} /> */}
        <Route path="/board/:id" element={<Tasks />} />
      </Route>
    </Routes>
  );
}

export default App;
