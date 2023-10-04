import { Fragment } from "react";
import ReactDOM from "react-dom";
import cls from "./Modal.module.scss";

type BackdropProps = {
  onClose: () => void;
};

type ModalOverlayProps = {
  onClose: () => void;
  children: React.ReactNode;
  modalParentClass?: string;
  modalContainerClass?: string;
};

type ModalProps = {
  children: React.ReactNode;
  modalOpen: boolean;
  onClose: () => void;
  modalParentClass?: string;
  modalContainerClass?: string;
};

const portalElement = document.getElementById("overlays") as HTMLElement;

const Backdrop = (props: BackdropProps) => {
  return <div className={cls.backdrop} onClick={props.onClose} />;
};

const ModalOverlay = (props: ModalOverlayProps) => {
  return (
    <div className={`${cls.defaultModal} ${props.modalParentClass}`}>
      <span onClick={props.onClose} className={cls.close}>
        <span></span>{" "}
      </span>
      <div className={props.modalContainerClass}>{props.children}</div>
    </div>
  );
};

const Modal = (props: ModalProps) => {
  return props.modalOpen ? (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        portalElement
      )}

      {ReactDOM.createPortal(
        <ModalOverlay
          onClose={props.onClose}
          modalParentClass={props.modalParentClass}
          modalContainerClass={props.modalContainerClass}
        >
          {props.children}
        </ModalOverlay>,
        portalElement
      )}
    </Fragment>
  ) : null;
};

export default Modal;

