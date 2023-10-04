import { useEffect, useRef, useState } from 'react';
import { DataBoard } from '../../api/board/types';
import { getBoards, createBoard as createBoardApi } from '../../api/board';

const useBoard = () => {
  const [boards, setBoards] = useState<DataBoard[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const closeModal = () => setModalOpen(false)
  const openModal = () => setModalOpen(true)

  const createBoard = async (name: string) => {
    if(!name.trim()) return;
    const newBoard = await createBoardApi(name);
    setBoards((prev) => [...prev, newBoard.data.data]);
    setModalOpen(false);
  };

  useEffect(() => {
    getBoards()
      .then(({ data }) => {
        console.log("getBoards")
        setBoards(data.data);

      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  return { boards, loading, modalOpen, closeModal,openModal, createBoard,  inputRef};
};

export default useBoard;
