import React from 'react'
import cls from "./Button.module.scss"


type ButtonType ={
   
    children: React.ReactNode|string;
    buttonClass?:string,
    onClick?:()=>void
}

export default function Button(props:ButtonType) {
  return (
    <button onClick={props.onClick} className={`${cls.defaultClass} ${props.buttonClass}`} >{props.children}</button>
  )
}
