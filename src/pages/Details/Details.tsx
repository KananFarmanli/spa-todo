import React, { Fragment } from "react";
import cls from "./Details.module.scss";
import Button from "../../components/Button/Button";
import { DataTask } from "../../api/datatask/types";
import useDetails from "./useDetails";
import ProcessRing from "../../components/ProcessRing/ProcessRing";
import MenuBar from "./components/MenuBar/MenuBar";
import Comments from "./components/Comments/Comments";
import Description from "./components/Description/Description";

/* type DetailsProps = Omit<DataTask, "comments" | "files"> & {
  index: number
}; */
type DetailsProps = DataTask & {
  index: number;
  closeModal:()=>void
};
function Details(props: DetailsProps) {
  const {
  
    handleMouseDown,

    handlePriority,
    progressBarFn,
    dataFormatter,
    priority,
    pane1,
    pane2,
    timeElapsed,
    handleDelete,
    commentsArray,
    setComments
  } = useDetails({taskId:props.id, createdAt: props.createdAt, status: props.status, closeModal: props.closeModal, priority:props.priority});

  const { formattedDate, formattedTime } = dataFormatter(props.createdAt);
  const progressBar: number | false = progressBarFn(props.subTasks);



  return (
    <Fragment>
      <div className={cls.splitContainer}>
        <div className={cls["pane-1"]} style={{ height:`${pane1}%` }}>
          <div className={cls.taskInformation}>
            <div className={cls.information}>
              <div className={cls.title}>
                <span>#{props.index} </span> <span> {props.name}</span>
              </div>

              <div className={cls.id}>
                <span>Unical ID :</span> <span>{props.id}</span>
              </div>

              <div className={cls.createdAt}>
                <span>Created at :</span>{" "}
                <div className={cls.date}>
                  {" "}
                  <span>{formattedTime}</span> <span>{formattedDate}</span>{" "}
                </div>
              </div>
              <div className={cls.inProcess}>
                <span>Doing :</span> <span> {timeElapsed}</span>
              </div>
            </div>

            <div className={cls.completedTasks}>
              {progressBar !== false ? (
                <ProcessRing
                  trackColor="rgb(255,255,255)"
                  indicatorColor="dodgerblue"
                  size={250}
                  progress={progressBar}
                  trackWidth={15}
                  indicatorWidth={10}
                />
              ) : (
                <ProcessRing
                  trackColor="rgb(255,255,255)"
                  indicatorColor="crimson"
                  size={200}
                  progress={100}
                  render={false}
                  label="You dont have any subtasks"
                  trackWidth={12}
                  indicatorWidth={8}
                />
              )}
            </div>

            <div className={cls.control}>
              <div className={cls.priority}>
                <div className={cls.priorityTitle}>Priority :</div>
                <div className={cls.priorityRadio}>
                  <label>
                    <p>Low</p>
                    <input
                      type="radio"
                      name="priority"
                      value="low"
                      checked={priority === "low"} 
                      onChange={() => handlePriority("low", props.id)} 
                    />
                    <span className={`${cls.radioCircle}  ${cls.low}`}></span>
                  </label>
                  <label>
                    <p>High</p>
                    <input
                      type="radio"
                      name="priority"
                      value="high"
                      checked={priority === "high"} 
                      onChange={() => handlePriority("high", props.id)} // 
                    />
                    <span className={`${cls.radioCircle} ${cls.high}`}></span>
                  </label>
                </div>
              </div>
              <Button onClick={()=>(handleDelete(props.id, props.parentId))} buttonClass={cls.delete}>Delete</Button>
            </div>
          </div>

          <div className={cls["description-comments-files"]}>
            <MenuBar menuList={["Description", "Comments",  "Files"]}>
              <Description id={"Description"} taskId={props.id}   description={props.description} />
              <Comments setComments={setComments} id={"Comments"} taskId={props.id} comments={commentsArray}/>

              <div id="Files">2</div>
           
            </MenuBar>
          </div>
        </div>
        <div className={cls.driver} onMouseDown={handleMouseDown}> <span className={cls.grabLine}></span></div>
        <div className={cls["pane-2"]} style={{ height:`${pane2}%` }}>


              <div className={cls.subtasksTitle}>Sub-Tasks <span>(3)</span></div>


              <div className={cls.subtasks}>


              </div>




        </div>
      </div>
    </Fragment>
  );
}


export default React.memo(Details)