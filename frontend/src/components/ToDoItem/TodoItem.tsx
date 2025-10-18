import type { ITodo } from "../../types/data";

export interface ITodoItemProps extends ITodo {
  removeTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
}

const TodoItem: React.FC<ITodoItemProps> = ({
  id,
  title,
  completed,
  removeTodo,
  toggleTodo,
}) => {
  return (
    <div>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => {
          toggleTodo(id);
        }}
      />
      {title}
      <button
        onClick={() => {
          removeTodo(id);
        }}
      >
        x
      </button>
    </div>
  );
};

export default TodoItem;
