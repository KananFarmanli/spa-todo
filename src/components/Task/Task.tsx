import  {Fragment} from "react";
import cls from "./Task.module.scss";
import {
  DraggableProvided,
  DraggableStateSnapshot,
  Draggable,
} from "react-beautiful-dnd";

import useModal from "../ui/useModal";
import Details from "../../pages/Details/Details";
import Modal from "../ui/Modal";
import { DataTask } from "../../api/datatask/types";
/* import { DataFile } from "../../api/datafile/types";
import { DataComment } from "../../api/datacomment/types"; */


type TaskType  = Omit<DataTask, "id"> & {
  index: number;
  draggableId: number;

}

interface DraggableProvidedtType extends DraggableProvided {
  placeholder: any;
}

export default function Task({
  draggableId,
  name,
  description,
  priority,
  columnId,
  createdAt,
  comments,
  files,
  index,
  parentId,
  position,
  status,
  subTasks
}: TaskType) {

  const { openModal, modalOpen, closeModal } = useModal();

  return (
    <Fragment>
      <Modal  modalOpen={true
    } 
      onClose={closeModal} 
      modalParentClass={cls.modalParentClass}
      modalContainerClass={cls.modalContainerClass}>
   <Details closeModal={closeModal} comments={comments} files={files} subTasks={subTasks} position={position} status={status} parentId={parentId} name={name} description={description} priority={priority} columnId={columnId} createdAt={createdAt} id={draggableId} index={index+1} />  
       
      

      </Modal>
    <Draggable draggableId={`${draggableId}`} key={draggableId} index={index}>
      {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => {
        return (
          <div onClick={(()=>openModal())}
            className={cls.task}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <div className={cls.container}>
              <div className={cls.taskId}>#{index+1}</div>
              <div className={cls.taskName}>{name}</div>
              <div className={`${cls.priority}  ${priority=="HIGH" && cls["priority-high"] }`}></div>
    
            </div>
          </div>
        );
      }}
    </Draggable>
   </Fragment>
  );
}
