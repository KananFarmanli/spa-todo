import React from 'react'
import classes from "./EmptyCard.module.scss"
import { AiOutlinePlusSquare } from 'react-icons/ai';

export default function EmptyCard() {
  return (

    <div className={classes.card}>
        <AiOutlinePlusSquare/>
        <p>Create</p>
    </div>
  )
}
