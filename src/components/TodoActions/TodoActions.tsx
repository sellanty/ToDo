import styles from "./TodoActions.module.css";

interface ITodoActionsProps {
  onClick: () => void;
  disabled?: boolean;
}

const TodoActions: React.FC<ITodoActionsProps> = ({
  onClick,
  disabled = false,
}) => {
  return (
    <div className={styles.main}>
      <button onClick={onClick} disabled={disabled}>
        Add
      </button>
    </div>
  );
};

export default TodoActions;
