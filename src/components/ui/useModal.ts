import  { useState, useEffect } from "react";

export default function useModal() {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const closeModal = () => setModalOpen(false);
  const openModal = () => setModalOpen(true);

  const toggleScrollLock = () => {
    const body = document.body;
    if (modalOpen) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = 'auto';
    }
  };

  // Вызывать toggleScrollLock при изменении состояния isOpen
  useEffect(() => {
    toggleScrollLock();
  }, [modalOpen]);

  return { closeModal, openModal, modalOpen };
}
