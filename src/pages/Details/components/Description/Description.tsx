import {  useState } from "react";
import { EditorState, convertToRaw , convertFromRaw} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import cls from "./Description.module.scss";

import classNames from "classnames";
import "./Description.scss";
import Button from "../../../../components/Button/Button";
import { updateTask } from "../../../../api/datatask";

type PropsType = {
  id: string;
  taskId:number
  description:string|null;
};

export default function Description(props: PropsType) {
 // const [editorState, setEditorState] = useState(EditorState.createEmpty());
 const [editorState, setEditorState] = useState(props.description ? EditorState.createWithContent(convertFromRaw(JSON.parse(props.description))) : EditorState.createEmpty());
  console.log(props.description,"=================================");
 
 const [readOnly, setReadOnly] = useState<boolean>(props.description ? true:false);
  const toolbarClasses = classNames({ "toolbarOff ": readOnly });
  const editorClasses = classNames({ "editor ": !readOnly }, "editorSize");
  //let description = JSON.parse(props.description)


  const handleEditorChange = (newEditorState: EditorState) => {
    setEditorState(newEditorState);
  };

  const renderDescription = async() => {
    const contentState = editorState.getCurrentContent();
    const rawContent = convertToRaw(contentState);
    const stringifiedContent = JSON.stringify(rawContent)
   
    let obj = {
      description:stringifiedContent
    }
    setReadOnly((prev) => !prev);
    console.log(rawContent);

    const response = await updateTask(props.taskId, obj )
    console.log(response);
  };

  return (
    <div className={cls["text-redactor-container"]} id={props.id}>
      <Editor
        toolbarClassName={toolbarClasses}
        editorState={editorState}
        wrapperClassName="wrapper"
        
        editorClassName={editorClasses}
        onEditorStateChange={handleEditorChange}
        readOnly={readOnly}

        customStyleMap={{color:"black"}}
        hashtag={{
          separator: ' ',
          trigger: '#',
        }}
       
        mention={{
          separator: ' ',
          trigger: '@',
          suggestions: [
            { text: 'JavaScript', value: 'javascript', url: 'js' },
            { text: 'Golang', value: 'golang', url: 'go' },
          ],
        }}
      />
      <Button onClick={renderDescription} buttonClass="buttonSubmit">
        {readOnly ? "Edit description" : "Save descriPtion"}
      </Button>
    </div>
  );
}

