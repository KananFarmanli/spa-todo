import cls from "./EmptyCard.module.scss";
import useEmptyCard from "./useEmptyCard";



type ButtonType={
  loadingCreateBtn:boolean,
  onClick:()=>void
}
export default function EmptyCard(props: ButtonType) {

  const { btnDisabled } = useEmptyCard({ loadingCreateBtn: props.loadingCreateBtn } );


  return (
    <div className={`${cls.container} ${btnDisabled}` }>
      <button className={cls.button} onClick={props.onClick}>
        CREATE
      </button>
    </div>
  );
}

