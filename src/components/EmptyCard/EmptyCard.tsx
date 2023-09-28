import classes from './EmptyCard.module.scss';

type EmptyButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function EmptyCard(props: EmptyButtonProps) {
  return (
    <button className={classes.card} {...props}>
      Create
    </button>
  );
}
