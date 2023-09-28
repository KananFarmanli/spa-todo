import React from 'react';
import classes from './Card.module.scss';
import { DataBoard } from '../../api/board/types';
import { useNavigate } from 'react-router-dom';

type CardProps = DataBoard;

export default function Card(props: CardProps) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/board/${props.id}`)}
      className={classes.card}
    >
      <div>
        <h1 className={classes.name}>{props.name}</h1>
        {/* <RiDeleteBinLine className={classes.delete} /> */}
      </div>
    </div>
  );
}
