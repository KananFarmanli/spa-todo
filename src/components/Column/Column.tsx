import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { DataTask } from "../../api/datatask/types";
import Task from "../Task/Task";
import cls from "./Column.module.scss";
import useColumn from "./useColumn";
import Button from "../Button/Button";
import Modal from "../ui/Modal";
import useModal from "../ui/useModal";
import classNames from "classnames";
import clsBtn from "../Button/Button.module.scss"

type ColumnProps = {
  createTask: (name: string) => Promise<void>;
  droppableId: number;
  title: string;
  tasks?: DataTask[];
};

const Dummy_TitleType ="Queue"

export default function Column({ droppableId, title, tasks,createTask }: ColumnProps) {
  const { openModal, modalOpen, closeModal } = useModal();
  const {handleSubmit, inputRef, loading}= useColumn({closeModal, createTask});
  const buttonCls = classNames(cls.buttonClass, {[clsBtn.btnDisabled]:loading})
  const columnCls = classNames(cls.taskWrapper, cls.customScroll)

 
  return (
    <div className={cls.wrapper}>
      <h1 className={cls.title}>{title}</h1>
      <Modal modalOpen={modalOpen} 
      onClose={closeModal} 
      modalParentClass={cls.modalParentClass}
      modalContainerClass={cls.modalContainerClass}
      >
     <form className={cls.form} onSubmit={(e)=>(handleSubmit(e))}>
          <div className={cls.request}>
            <label htmlFor="addTask">Inset task title :</label>
            <input className={cls.requestInput}  ref={inputRef} type="text" id="addTask" />
          </div>
          <Button   >Confirm</Button>
     </form>
      </Modal>
      <div className={columnCls}>
        <Droppable droppableId={`${droppableId}`}>
          {(provided, snapshot) => {
            return (


              
              <div
                className={cls.taskContainer}
                ref={provided.innerRef}
                 {...provided.droppableProps} 
              >
               
                   { tasks?.map((task, index) => {
                   // console.log(task)
                 return  <Task
                   parentId={task.parentId}
                   position={task.position}
                   status={task.status}
                   subTasks={task.subTasks}
                    draggableId={task.id} 
                    name={task.name} 
                    description={task.description} 
                    priority={task.priority} 
                    columnId={task.columnId} 
                    createdAt={task.createdAt} 
                    index={index} 
                    comments={task.comments} 
                    files={task.files}
                    key={task.id}
                  /> 
                   })} 
                
                {provided.placeholder}
                
              </div>
             
            );
          }}
        </Droppable> 
      </div>
          {title == Dummy_TitleType && (<Button onClick={openModal} buttonClass={buttonCls} > Add Task</Button>)}
    </div>
  );
}
