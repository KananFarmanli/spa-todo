import React, {useState} from 'react'


export default function useColumn() {

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const closeModal = () => setModalOpen(false)
  const openModal = () => setModalOpen(true)
  const submitHandler = () => {
    console.log("submit")
  }

  return {openModal, closeModal, modalOpen, submitHandler}
}
