import { Fragment } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import cls from "./Columns.module.scss";
import { useParams } from "react-router-dom";
import useColumns from "./useColumns";
import Column from "../../components/Column/Column";
import Loading from "../../components/Loading/Loading";

export default function Columns() {
  const { id } = useParams();
  let newId = Number(id);
  const { state, setState, loading, handleDragEnd, createTask } =
    useColumns(newId);

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <div className={cls.container}>
          <DragDropContext
            onDragEnd={(result) => handleDragEnd(result, state, setState)}
          >
            {state.columns.map((el, index) => {
          //   console.log(el)
            return  <Column
                createTask={createTask}
                droppableId={index}
                title={el.name}
                tasks={el.task}
                key={el.id}
              />
})}
          </DragDropContext>
        </div>
      )}
    </Fragment>
  );
}
