import classes from "./EmptyCard.module.scss";

type EmptyButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function EmptyCard(props: EmptyButtonProps) {
  return (
    <div className={classes.container}>
      <button className={classes.button} {...props}>
        CREATE
      </button>
    </div>
  );
}
