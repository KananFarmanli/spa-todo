import { useRef, FormEvent, useState} from "react";


type ColumnProps = {
  createTask: (name: string) => Promise<void>;
  closeModal: () => void;
};
export default function useColumn(props: ColumnProps) {
  const [loading, setState] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.closeModal();
    console.log("submit", event);

    const name = inputRef.current!.value;
    console.log(name);

    try {
      setState(true)
      await props.createTask(name);
 
    } catch (error) {
    } finally {   setState(false)

    }
  };

  return { handleSubmit,loading, inputRef };
}
