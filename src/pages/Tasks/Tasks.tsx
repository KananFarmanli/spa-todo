import { useState, useEffect,Fragment  } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import axios from "axios";
import cls from "./Tasks.module.scss"
import { useParams } from "react-router-dom";
import { DataColumn } from "../../api/column/types";
import useTasks from "./useTasks"
import Column from "../../components/Column/Column";
import Loading from "../../components/Loading/Loading";
import Button from "../../components/Button/Button";
import Details from "../Details/Details";




export default function Tasks() {
    const { id } = useParams();
    let newId = Number(id);
    const {data:{columns},loading,  modalOpen, closeModal, openModal, handleDragEnd  } = useTasks(newId);
  
// console.log(data)
console.log(columns)

  return (
    <Fragment>

      <Details/>
      {loading? <Loading/> :<div className={cls.container}>
        <DragDropContext onDragEnd={handleDragEnd}>
           {columns.map((el) => (
           <Column  id={el.id} title={el.name} openModal={openModal} tasks={el.task} key={el.id}/>
          ))} 
        </DragDropContext>
  
      </div>}
           
    </Fragment>
  )
}
