import React, { Fragment, useState } from "react";
import cls from "./Board.module.scss";
import Card from "../../components/Card/Card";
import EmptyCard from "../../components/EmptyCard/EmptyCard";
import useBoard from "./useBoard";
import Modal from "../../components/ui/Modal";
import Loading from "../../components/Loading/Loading";
import Button from "../../components/Button/Button";

export default function Board() {
  const {
    boards,
    loading,
    modalOpen,
    inputRef,
    openModal,
    createBoard,
    closeModal,
  } = useBoard();

  console.log(boards);
  return (
    <Fragment>
      {!loading ? (
        <div className={cls.grid}>
          <EmptyCard onClick={openModal} />
          {boards.map((board) => (
            <Card key={board.id} {...board} />
          ))}

          <Modal
            modalOpen={modalOpen}
            onClose={closeModal}
            modalParentClass={cls.modalParentClass}
            modalContainerClass={cls.modalContainerClass}
          >
            <div className={cls.request}>
              <label htmlFor="requestInput"> Create board</label>
              <input
                className={cls.requestInput}
                ref={inputRef}
                type="text"
                name=""
                id="requestInput"
              />
            </div>
            <Button
              buttonClass={cls.buttonClass}
              onClick={() =>
                createBoard(inputRef.current ? inputRef.current.value : "")
              }
            >
              Confirm
            </Button>
          </Modal>
        </div>
      ) : (
        <Loading />
      )}
    </Fragment>
  );
}
