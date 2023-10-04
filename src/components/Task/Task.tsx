import React from "react";
import cls from "./Task.module.scss";
import {
  DraggableProvided,
  DraggableStateSnapshot,
  Draggable,
} from "react-beautiful-dnd";

type TaskType = {
  index: number;
  id: number;
  name: string;
  description: string;
  priority: "LOW" | "HIGH";
  columnId: number;
  date: string;
  comments?: [];
  file?: [];
};

interface DraggableProvidedtType extends DraggableProvided {
  placeholder: any;
}

export default function Task({
  id,
  name,
  description,
  priority,
  columnId,
  date,
  index,
}: TaskType) {
  return (
    <Draggable draggableId={`${id}`} key={id} index={index}>
      {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => {
        return (
          <div
            className={cls.task}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <div className={cls.container}>
              <div className={cls.taskId}>#{id}</div>
              <div className={cls.taskName}>{name}</div>
            </div>
          </div>
        );
      }}
    </Draggable>
  );
}
