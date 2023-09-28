import { Fragment } from 'react';

import classes from './Modal.module.scss';

const Backdrop = (props: { onClose: () => void }) => {
  return <div className={classes.backdrop} onClick={props.onClose} />;
};

const ModalOverlay = (props: { children: React.ReactNode }) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const Modal = (props: {
  onClose: () => void;
  children: React.ReactNode;
  modalOpen: boolean;
}) => {
  return props.modalOpen ? (
    <Fragment>
      <Backdrop onClose={props.onClose} />,
      <ModalOverlay>{props.children}</ModalOverlay>,
    </Fragment>
  ) : null;
};

export default Modal;
