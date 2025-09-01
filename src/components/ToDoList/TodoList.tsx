import type { ITodo } from "../../types/data";
import TodoItem from "../ToDoItem/TodoItem";

interface ITodoListProps {
  items: ITodo[];
  removeTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
}

const TodoList: React.FC<ITodoListProps> = ({
  items,
  removeTodo,
  toggleTodo,
}) => {
  return items.map((elem) => (
    <TodoItem
      key={elem.id}
      removeTodo={removeTodo}
      toggleTodo={toggleTodo}
      {...elem}
    />
  ));
};

export default TodoList;
