import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { DataTask } from "../../api/datatask/types";
import Task from "../Task/Task";
import cls from "./Column.module.scss";
import useColumn from "./useColumn";
import Button from "../Button/Button";
import Modal from "../ui/Modal";

type ColumnProps = {
  children?: React.ReactNode;
  id?: number;
  title?: string;
  openModal?: (() => void) ;
  tasks?: DataTask[];
};

const Dummy_TitleType ="Queue"

export default function Column({ id, title, tasks, }: ColumnProps) {
 
/*  
its little hook that meant to be used for arrangment of logic
but for the moment there just one function */
 const {closeModal,modalOpen, openModal, submitHandler}= useColumn();

const fnclose = () =>{

}
 
 console.log(tasks)
 
 
  return (
    <div className={cls.wrapper}>
      <h1 className={cls.title}>{title}</h1>
      <Modal modalOpen={modalOpen} onClose={closeModal} modalParentClass={cls.modalParentClass}>


      <form className={cls.addTaskForm}>
       
          <div className={cls.addTaskContainer}>
            <label htmlFor="addTask">Inset task title :</label>
            <input type="text" id="addTask" />
          </div>

          <div className={cls.priorityContainer}>
            <div className={cls.priorityTitle}>Choose Priority :</div>
            <div className={cls.priorityRadio}>
              <label>
                <input type="radio" name="priority" value="low" checked/>
                <span className={`${cls.radioCircle}  ${cls.low}`}>Low</span> 
              </label>
              <label>
                <input type="radio" name="priority" value="high" />
                <span className={`${cls.radioCircle} ${cls.high}`}>High</span> 
              </label>
            </div>
          </div>
          
          <Button onClick={submitHandler} buttonClass={cls.buttonClass}>Confirm</Button>
        </form>


      </Modal>
      <div className={cls.taskContainer}>
        <Droppable droppableId={`${id}`}>
          {(provided, snapshot) => {
            return (
              <div
                className={cls.taskContainer}
                ref={provided.innerRef}
                 {...provided.droppableProps} 
              >
               
                   { tasks?.map((task, index) => (
                   <Task
                    id={task.id} 
                    name={task.name} 
                    description={task.description} 
                    priority={task.priority} 
                    columnId={task.columnId} 
                    date={task.createdAt} 
                    index={index} 
                    comments={[]} 
                    file={[]}
                    key={index}
                  /> 
                ))} 
                
                {provided.placeholder}
                {title == Dummy_TitleType && (
                  <Button onClick={openModal} buttonClass={cls.buttonClass}> Add Task</Button>
                  
                
                  )}
                
              </div>
            );
          }}
        </Droppable> 
      </div>
    </div>
  );
}
