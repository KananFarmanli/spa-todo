import React from "react";
import classes from "./Card.module.scss";

import { RiDeleteBinLine } from 'react-icons/ri';


let dummyObject = {
  id: 1,
  title: "Title",
  columns: ["first", "second", "third"],
  createdAt: new Date(),
};


export default function Card() {



  const dateComp  = () => {
    const date = dummyObject.createdAt;
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString(),
    };
  };


 

  return <div className={classes.card}>
        
            <div>
                
            <h1 className={classes.name}>Create admin dashboard</h1>
            <RiDeleteBinLine className={classes.delete} />
            </div>

            <div className={classes.info}>
                <div className={classes.tasks}>Completed tasks : <span>4/23</span> </div>
                
                <div className={classes.time}>
                    <div >22:23:12</div>
                    <div >01/23/24</div>    
                </div>
            </div>
    </div>;
}
