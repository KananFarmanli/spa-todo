import React, { Fragment } from "react";
import cls from "./Details.module.scss";
import Modal from "../../components/ui/Modal";
import Button from "../../components/Button/Button";
export default function Details() {


  return (
    <Fragment>
      <Modal modalOpen={true} 
      onClose={()=>{console.log("close")}}
      modalContainerClass={cls.modalContainer}
      modalParentClass={cls.modalContainerParent}
      
      
      >

        
      </Modal>
    </Fragment>
  );
}
