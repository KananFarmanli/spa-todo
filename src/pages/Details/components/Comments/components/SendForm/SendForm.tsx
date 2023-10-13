import React, { useRef, FormEvent } from "react";
import Button from "../../../../../../components/Button/Button";
import cls from "./SendForm.module.scss";
import { createComments } from "../../../../../../api/datacomment";
import { z } from "zod";
import { DataComment } from "../../../../../../api/datacomment/types";
export const createCommentValidation = z.object({
  taskId: z.number(),
  parentId: z.union([z.number(), z.null()]),
  content: z.string(),
});

type SendProps = {
  taskId: number;
  parentId: null | number;
  formClass?: string;
  buttonClass?: string;
  onClick?: () => void;
  setIsFormOpen?:React.Dispatch<React.SetStateAction<boolean>>
  setComments: React.Dispatch<React.SetStateAction<DataComment[]>>
};
function SendForm(props: SendProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const content = inputRef.current?.value;

    const payload = {
      content: content,
      parentId: props.parentId,
      taskId: props.taskId,
    };
    const validation = createCommentValidation.safeParse(payload);
    if (!validation.success) return;
    console.log(validation.data);
    inputRef.current!.value = "";
    const newTask = await createComments(validation.data);
    props.setComments((prev: DataComment[]) => ([...prev]));
   // i still need to find solution to render

    if(props.setIsFormOpen){

      props.setIsFormOpen(false)
    }
  };

  return (
    <form
      className={`${cls.form} ${props.formClass}`}
      onSubmit={(e) => submitHandler(e)}
    >
      <input ref={inputRef} type="text" />
      <Button
        buttonClass={`${cls.buttonClass} ${props.buttonClass}`}
        onClick={props.onClick}
      >
        {" "}
        send
      </Button>
    </form>
  );
}
export default React.memo(SendForm)
