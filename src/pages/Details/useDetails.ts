import { useState, useEffect } from "react";
import { DataTask } from "../../api/datatask/types";
import { deleteTask } from "../../api/datatask";
import { DataComment } from "../../api/datacomment/types";
import { getComments } from "../../api/datacomment";
import { updateTask } from "../../api/datatask";
type PropsType = {
  createdAt: string;
  status: string;
  closeModal: () => void;
  priority:string;
  taskId:number;
};
export default function useDetails(props: PropsType) {
  const [commentsArray, setComments] = useState<DataComment[]>([]);
  const [pane1, setPane1] = useState<string>("95%");
  const [pane2, setPane2] = useState<string>(`${100 - parseInt(pane1)}%`);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [timeElapsed, setTimeElapsed] = useState("");
  const [priority, setPriority] = useState(props.priority.toLowerCase());

  const progressBarFn = (subTasks: DataTask[]) => {
    console.log(subTasks,"carta carta cart")
    if (subTasks.length ==0) {
      return false;
    }
  //  console.log(subTasks.length, "length of tasks: " + subTasks.length);
    const overall: number = subTasks?.length;
    const notCompleteSubtasks: number = subTasks.filter(
      (t) => t.status.toUpperCase() == "DONE"
    ).length;
    console.log(
      notCompleteSubtasks,
      overall,
      (notCompleteSubtasks / overall) * 100
    );
    const progress: number = Math.round((notCompleteSubtasks / overall) * 100);
    console.log(progress, "progreeessss");
    return progress;
  };

  const dataFormatter = (
    dateString: string
  ): { formattedTime: string; formattedDate: string } => {
    const date = new Date(dateString);

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
    const formattedDate = `${day.toString().padStart(2, "0")}/${month
      .toString()
      .padStart(2, "0")}/${year}`;

    const formattedDateTime = `${formattedTime}  ${formattedDate}`;

    return { formattedTime, formattedDate };
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    setIsDragging(true);

    document.body.style.cursor = "grabbing";
  };

  const handleMouseMove = (e: MouseEvent) => {
    const mouseY = e.clientY;
    const containerHeight = window.innerHeight;
    const newPane1Height = `${(mouseY / containerHeight) * 100}%`;
    setPane1(newPane1Height);
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
    setIsDragging(false);
    document.body.style.cursor = "auto";
  };
  const handlePriority = async (string: string, id: number) => {
    if (string === "low" || string === "high") {
      const priorityValue = string === "low" ? "LOW" : "HIGH";
      const obj = {
        priority: priorityValue,
      };
      setPriority(priorityValue.toLowerCase())
      try {
        const response = await updateTask(id, obj);
        // Ваша логика обработки ответа от сервера, например, обработка ошибок.
        console.log(response);
      } catch (error) {
        console.error("Ошибка при обновлении задачи:", error);
        // Добавьте обработку ошибок, если необходимо.
      }
    }
  };

  const handleDelete = async (id: number, parentId: null | number) => {
    //update issue
    if (parentId == null) {
      props.closeModal();
    }
    deleteTask(id);
  };

  useEffect(() => {
    if (props.status.toLowerCase() === "done") {
      // Если статус "done", устанавливаем "done" как значение timeElapsed
      setTimeElapsed("done \u2713");
    } else {
      console.log(props.status);
      const interval = setInterval(() => {
        const currentTime: Date = new Date();
        const createdTime: Date = new Date(props.createdAt);
        const timeDifference: number =
          Number(currentTime) - Number(createdTime);
        const hoursDifference: number = Math.floor(
          timeDifference / (1000 * 60 * 60)
        );
        const minutesDifference: number = Math.floor(
          (timeDifference / (1000 * 60)) % 60
        );
        const formattedTimeElapsed: string = `${hoursDifference} h - ${minutesDifference} m`;
        setTimeElapsed(formattedTimeElapsed);
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [props.createdAt, props.status]);

  useEffect(() => {
    setPane2(`${100 - parseInt(pane1)}%`);
  }, [pane1]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        let id = props.taskId
        console.log(id,"fetching comments================  ")
        const { data, status, statusText } = await getComments(id)
        if (status === 200) {
        
          setComments(data);
        } else {
          console.error("Ошибка при получении комментариев:", statusText);
        }
      } catch (error) {
        console.error("Произошла ошибка:", error);
      }
    };

    fetchComments();
  }, []);

  return {
    handleMouseMove,
    handleMouseDown,
    handleMouseUp,
    pane1,
    pane2,
    dataFormatter,
    timeElapsed,
    progressBarFn,
    handlePriority,
    priority,
    handleDelete,
    commentsArray,
    setComments,
  };
}
