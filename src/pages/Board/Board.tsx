import React, { useState } from 'react';
import classes from './Board.module.scss';
import Card from '../../components/Card/Card';
import EmptyCard from '../../components/EmptyCard/EmptyCard';
import useBoard from './useBoard';
import Modal from '../../components/ui/Modal';

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

  return (
    <div className={classes.grid}>
      <EmptyCard onClick={openModal} />
      {loading && 'Loading...'}
      {boards.map((board) => (
        <Card key={board.id} {...board} />
      ))}

      <Modal modalOpen={modalOpen} onClose={closeModal}>
        <input ref={inputRef} type="text" name="" id="" />
        <button
          onClick={() =>
            createBoard(inputRef.current ? inputRef.current.value : '')
          }
        >
          create borad
        </button>
      </Modal>
    </div>
  );
}
