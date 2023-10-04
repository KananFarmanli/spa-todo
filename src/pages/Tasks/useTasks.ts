import { useEffect, useRef, useState } from "react";
import { DataBoardId } from "../../api/board/types";
import { getBoardById } from "../../api/board";
import { DropResult } from 'react-beautiful-dnd';
import axios from "axios";


const useTasks = (arg: number) => {
  const [data, setData] = useState<DataBoardId>({
    id: 0, 
    name: '',
    columns: [],
    createdAt: '',
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  
  const closeModal = () => setModalOpen(false);
  const openModal = () => setModalOpen(true);
  let id = 1;

  function handleDragEnd(result:DropResult) {
    
    const { destination, source, draggableId } = result;
    console.log(source, destination);
    console.log(draggableId);
    if (destination && source.droppableId === destination.droppableId) {
        return;
      }
  }

 /*  useEffect(() => {
    (async function () {
      let { data } = await axios.get("http://localhost:8080/board");
      console.log(data);
      setTasks(data);
    })();
  }, []); */


  useEffect(() => {
    getBoardById(arg)
      .then(({ data:{data} }) => {
        console.log("getColumn");
        console.log(data);
        setData(data);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, modalOpen, closeModal, openModal, handleDragEnd };
};

export default useTasks;
