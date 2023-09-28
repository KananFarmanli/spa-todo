import React from 'react'
import classes from "./Board.module.scss"
import Card from '../../components/Card/Card'
import EmptyCard from '../../components/EmptyCard/EmptyCard'

export default function Board() {
  return (
    <div className={classes.grid}>
    <EmptyCard />
    <Card />
    <Card />
    <Card />
    <Card />
    </div>
  )
}
