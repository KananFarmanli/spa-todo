
import cls from "./EmptyCard.module.scss";
import classNames from "classnames";
let cx = classNames.bind(cls);

interface UseEmptyCardProps {
    loadingCreateBtn: boolean;
  }

export default function useEmptyCard(props: UseEmptyCardProps) {
    let btnDisabled = cx({
        [cls.btnDisabled]: props.loadingCreateBtn
      })

  return {btnDisabled}
}
