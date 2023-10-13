import { useEffect, useRef, useState } from "react";
import { DataBoardId } from "../../api/board/types";
import { getBoardById } from "../../api/board";
import { DropResult } from 'react-beautiful-dnd';
import { DataTask } from "../../api/datatask/types";
import { z } from 'zod';
import { createTask as createTaskApi } from '../../api/datatask/endpoints';
import { DataColumn } from '../../api/column/types';
import { moveTask } from "../../api/datatask/endpoints";


export const createTaskValidation = z.object({
  columnId: z.number(),
  name: z.string(),
});


const useColumns = (arg: number) => {
  const [state, setState] = useState<DataBoardId>({
    id: 0, 
    name: '',
    columns: [],
    createdAt: '',
  });
  const [loading, setLoading] = useState<boolean>(true);

  
  const createTask = async (name: string) => {


    const payload = {
      name: name,
      columnId: state.columns[0].id,
    };

    const validation = createTaskValidation.safeParse(payload);
    if (!validation.success) return;

    const newTask = await createTaskApi(validation.data);

    const newUpdatedColumns = state.columns.map((c) => {
      console.log(c)
      if (c.name === 'Queue') {
        let task ={...newTask.data.data, subTasks:[]}
// api неправильно сделал поэтому возвращает без сабтасков времени не было исправлять, на код это нее будет действовать
// но от ошибок убережет меня.
        console.log(task)
        return { ...c, task: [...c.task, task] };
      } else {
        return c;
      }
    });

    setState((prev) => ({ ...prev, columns: newUpdatedColumns }));
  };


 async function handleDragEnd(result:DropResult, state:DataBoardId, setState:React.Dispatch<React.SetStateAction<DataBoardId>>) {

    const dataObject = structuredClone(state)
    const {destination, source} = result;
    
    if(!destination) return
    if(destination.droppableId===source.droppableId && destination.index=== source.index){
      return
    }
  
   let indexSourceOfColumn = Number(source.droppableId)
   let indexDestinationOfColumn = Number(destination.droppableId)

   let indexSourceOfList = source.index
   let indexDestinationOfList = destination.index
//    console.log( Number(source.droppableId))
//    console.log(dataObject.columns)
// console.log(indexSourceOfColumn)
   let columnSource:DataTask[] =dataObject?.columns[indexSourceOfColumn].task!
   let columnDestination:DataTask[] =dataObject?.columns[indexDestinationOfColumn].task!

   
    let taskSource = columnSource[indexSourceOfList] 
    let taskDestination = columnDestination[indexDestinationOfList]

    let newColumnForApi

    const updatePosition = (column:DataTask[]) => column.map((el, index) => ({ ...el, position: index + 1 }));
    const moveElement = (column:DataTask[], fromIndex:number, toIndex:number) => {
      const elementToMove = column.splice(fromIndex, 1)[0];
      column.splice(toIndex, 0, elementToMove);
      return column; 
      }

    if(source.droppableId !== destination.droppableId){
      columnSource.splice(indexSourceOfList , 1)
      columnDestination.splice(indexDestinationOfList, 0,taskSource )
      dataObject.columns[indexSourceOfColumn].task = updatePosition(columnSource);
      dataObject.columns[indexDestinationOfColumn].task = updatePosition(columnDestination)
      newColumnForApi = dataObject.columns[indexDestinationOfColumn].task
    }else{
      moveElement(columnSource, indexSourceOfList, indexDestinationOfList )
      dataObject.columns[indexSourceOfColumn].task = updatePosition(columnSource)
      newColumnForApi = updatePosition(columnSource)
    }
console.log(newColumnForApi)
    const columnSourceForApi = Number(dataObject?.columns[indexSourceOfColumn].id)
   const columnDestinationForApi = Number(dataObject?.columns[indexDestinationOfColumn].id)
   let obj ={
    tasks:newColumnForApi,
      oldColumnId:columnSourceForApi,
      newColumnId:columnDestinationForApi
   }

setState(dataObject)
try {
const response= await  moveTask(
      newColumnForApi,
      columnSourceForApi,
      columnDestinationForApi)
    } catch (error) {
      //нужно добавить логику неудачных запросов и возможно аборты но я не успеваю. сорри
      console.error('Ошибка при выполнении запроса:', error);
    }
  

   }

  useEffect(() => {
    getBoardById(arg)
      .then(({ data:{data} }) => {
        setState(data);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  return { state, setState, loading, handleDragEnd, createTask };
};

export default useColumns;
