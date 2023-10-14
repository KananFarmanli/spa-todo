import React from "react";
import cls from "./Comments.module.scss";
/* import useComments from "./useComments";
import axios from "axios";
import Button from "../../../../components/Button/Button"; */
import { DataComment } from "../../../../api/datacomment/types";
import Comment from "./components/Comment/Comment";
import SendForm from "./components/SendForm/SendForm";
type PropsType = {
  id: string;
  height?: number;
  maxHeight?: number;
  taskId:number;
      comments:DataComment[]
      setComments: React.Dispatch<React.SetStateAction<DataComment[]>>
};



 function Comments(props: PropsType) {

   let paddingForComments = 1


/*   useEffect(()=>{
const abort=new AbortController()
    axios.get(`/api/comments`,{signal:abort.signal})

return ()=>{
  abort.abort()
}
  },[]) */   
  return (
    <div id={props.id} className={cls.container}>
          <div className={cls.comments}>

      { props.comments.length==0?  <div className={cls.noComment}> No comments yet</div> :     props.comments.map((comment) => (
        <Comment key={comment.id} comment={comment} paddingForComments={paddingForComments} setComments={props.setComments} />
      ))
      }
        </div>
     <SendForm setComments={props.setComments} taskId={props.taskId} parentId={null}/>
    </div>
  );
}

export default React.memo(Comments)

/* 



*/