import React, { useEffect, useState, useReducer, Fragment } from "react";
import "./TextEditor.scss";
// import { EditorState, ContentState } from 'draft-js';
// import { Editor } from 'react-draft-wysiwyg';
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';



import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

type PropsType={
  id?:string,
  height?:number,
  maxHeight?:number;
  gap?:number
}

export default function TextEditor(props:PropsType ){
  const [value, setValue] = React.useState("");

  return (
    <Fragment>
      <ReactQuill
       style={{ display:"flex", flexDirection:"column", height: `${props.height || "100"}%`, maxHeight:`${props.maxHeight || "80"}%`}}
        value={value}
        onChange={setValue}
      />
      <button className="buttonSubmit"> Save descriotion</button>
    </Fragment>
  );
}






/* 

<div style={{ display:"flex",gap:`${props.gap || "0"}px`, flexDirection:"column", justifyContent:"space-between", height: `${props.height || "100"}%`, maxHeight:`${props.maxHeight || "100"}%`}}>

import React, { useEffect, useState, useReducer } from "react";
import "./TextEditor.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

type PropsType={
  id?:string,
  height?:number,
  maxHeight?:number;
}

export default function TextEditor(props:PropsType ){
  const [value, setValue] = React.useState("");

  return (
    <div className="text-redactor-container" id={props.id}>
      <ReactQuill
        style={{ height: `${props.height || "80"}%`, maxHeight:`${props.maxHeight || "80"}%`, display:"flex",flexDirection:"column", }}
        value={value}
        onChange={setValue}
      />
      <button className="buttonSubmit"> Save descriotion</button>
    </div>
  );
}



*/