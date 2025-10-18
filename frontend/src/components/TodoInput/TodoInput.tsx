import { useRef, useEffect} from "react";
import type { KeyboardEvent } from "react"

interface ITodoInputProps {
  value: string;
  onChange: (value: string) => void;
  addTodos: () => void;
  autoFocus?: boolean;
}

const TodoInput:React.FC<ITodoInputProps> = ({value, onChange, addTodos, autoFocus = false}) => {

    const inputRef = useRef<HTMLInputElement>(null);

    const handleKeyDown= (e: KeyboardEvent<HTMLInputElement> ) => {
        if (e.key === 'Enter') addTodos();
    }

    useEffect(() => {
        if (autoFocus && inputRef.current) {
          inputRef.current.focus();
        }
      }, [autoFocus]);
    

  return (
    <input value={value} onChange={(e) => {onChange(e.target.value)}} ref={inputRef} onKeyDown={handleKeyDown} placeholder="Введите задачу..."/>
  );
};

export default TodoInput;
