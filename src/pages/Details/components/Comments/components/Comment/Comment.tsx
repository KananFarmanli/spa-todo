import React, { useState, useEffect } from "react";
import cls from "./Comment.module.scss";
import classNames from "classnames";
import { DataComment } from "../../../../../../api/datacomment/types";
import SendForm from "../SendForm/SendForm";
import { RiDeleteBinLine} from 'react-icons/ri';
type CommentProps = {
  comment: DataComment;
  paddingForComments: number;
  setComments: React.Dispatch<React.SetStateAction<DataComment[]>>
};

 function Comment(props: CommentProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false); 
  let enhancedPadding = props.paddingForComments + 5;
  const toggleReplies = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };

  let haveChildren = props.comment?.comments?.length > 0 ? true : false;


  return (
    <div className={cls.commentContainer}>
      {haveChildren && (
        <div
          className={cls.tree}
          style={{ width: `${enhancedPadding + 40}px` }}
        ></div>
      )}
      <div
        className={cls.wrapper}
        style={{
          marginLeft: `${enhancedPadding}px`,
          width: `calc(100% - ${enhancedPadding}px)`,
        }}
      >
        <div className={cls.commentWrapper}>
          <div className={cls.comment}>
           <div className={cls.content}> {props.comment.content}</div>
           <button><RiDeleteBinLine/></button>
          </div>
          <div
            className={cls.reply}
            onClick={toggleForm} 
          >
            {isFormOpen ? "Cancel" : "Reply"}
          </div>
          {isFormOpen && (
            <SendForm
            setIsFormOpen={setIsFormOpen}
              setComments={props.setComments}
              buttonClass={cls.buttonClass}
              formClass={cls.formClass}
              taskId={props.comment.taskId}
              parentId={props.comment.id}
            />
          )}
        </div>

        {isExpanded && props.comment.comments.length > 0 && (
          <div>
            {props.comment.comments.map((reply) => (
              <Comment
              setComments={props.setComments}
                key={reply.id}
                comment={reply}
                paddingForComments={enhancedPadding}
              />
            ))}
          </div>
        )}

        {haveChildren && (
          <div className={cls.showComments} onClick={toggleReplies}>
            {!isExpanded ? `Show sub-comments  ( ${props.comment.comments.length} )` : "Hide sub-comments"}
          </div>
        )}
      </div>
    </div>
  );
}

export default React.memo(Comment)