import { Fragment } from "react";
import cls from "./Board.module.scss";
import Card from "../../components/Card/Card";
import EmptyCard from "../../components/EmptyCard/EmptyCard";
import useBoard from "./useBoard";
import Modal from "../../components/ui/Modal";
import Loading from "../../components/Loading/Loading";
import Button from "../../components/Button/Button";
import useModal from "../../components/ui/useModal";

export default function Board() {
  const { openModal, modalOpen, closeModal } = useModal();

  const { boards, loading, inputRef , handleSubmit, loadingCreateBtn} = useBoard(closeModal);

  console.log(boards);
  return (
    <Fragment>
      {!loading ? (
        <div className={cls.grid}>
          <EmptyCard onClick={openModal} loadingCreateBtn={loadingCreateBtn} />
          {boards.map((board) => (
            <Card key={board.id} {...board} />
          ))}

          <Modal
            modalOpen={modalOpen}
            onClose={closeModal}
            modalParentClass={cls.modalParentClass}
            modalContainerClass={cls.modalContainerClass}
          >

            <form className={cls.form} onSubmit={handleSubmit}>
              <div className={cls.request}>
                <label htmlFor="requestInput"> Create board :</label>
                <input className={cls.requestInput} ref={inputRef} type="text" name="" id="requestInput"/>
              </div>
              <Button onClick={()=>(openModal())} buttonClass={cls.buttonClass} >Confirm</Button>
            </form>

          </Modal>
        </div>
      ) : (
        <Loading />
      )}
    </Fragment>
  );
}
