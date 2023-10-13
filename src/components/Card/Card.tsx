import React from "react";
import classes from "./Card.module.scss";
import { DataBoard } from "../../api/board/types";
import { useNavigate } from "react-router-dom";
import { RiDeleteBinLine} from 'react-icons/ri';
import { deleteBoard } from "../../api/board";
type CardProps = DataBoard;

export default function Card(props: CardProps) {
  const navigate = useNavigate();

  const converToSeparateDate = (fullDate: string) => {
    let newDate = new Date(fullDate);
    let hours = newDate.getHours().toString().padStart(2, "0");
    let minutes = newDate.getMinutes().toString().padStart(2, "0");
    let time = `${hours}:${minutes}`;
    let date = newDate.toLocaleDateString();
    return [time, date];
  };


  const deleteHandler =(e: React.MouseEvent<HTMLButtonElement>, id:number)=>{
    e.stopPropagation()
    deleteBoard(id)
  }
  const [time, date] = converToSeparateDate(props.createdAt);

  return (
    <div
      onClick={() => navigate(`/board/${props.id}`)}
      className={classes.container}
    >
      <button className={classes.button}>

        <div className={classes.title}>
          <h1 className={classes.name}>{props.name.toLocaleUpperCase()}</h1>
          <button onClick={(e)=>(deleteHandler(e,props.id))}>

        <RiDeleteBinLine className={classes.delete} /> 
          </button>
        </div>

        <div className={classes.info}>
          <span>{time}</span>
          <span>{date}</span>
        </div>




      </button>
    </div>
  );
}
