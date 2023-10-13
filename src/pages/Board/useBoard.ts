import { useEffect, useRef, useState, FormEvent } from 'react';
import { DataBoard } from '../../api/board/types';
import { getBoards, createBoard as createBoardApi } from '../../api/board';

const useBoard = ( closeModal: () => void) => {
  const [boards, setBoards] = useState<DataBoard[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingCreateBtn, setLoadingCreateBtn] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const createBoard = async (name: string, ) => {
    setLoadingCreateBtn(true); 
   // closeModal();
    if (!name.trim()) return;

    try {
      const newBoard = await createBoardApi(name);
      setBoards((prev) => [...prev, newBoard.data.data]);
      
    } catch (error) {
      console.error("Error creating board:", error);
    } finally {
      setLoadingCreateBtn(false); 
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    closeModal() 

    const name = inputRef.current?.value;
    if (name) {
      createBoard(name); 
    }
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

  return { boards, loading, createBoard, handleSubmit, loadingCreateBtn, inputRef};
};

export default useBoard;
