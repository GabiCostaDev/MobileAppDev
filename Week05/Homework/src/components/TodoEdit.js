import '../styles/TodoEdit.css';
import {useState} from 'react';

const TodoEdit = (props) => {
  const {todo, onSubmit} = props;
  const [title, setTitle] = useState(todo.title);

  const handleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(todo.id, title);
  };

  return (
    <div className="todo-edit">
      <form onSubmit={handleSubmit}>
        <div>
          <input onChange={handleChange} value={title} placeholder="Edit task" />
          <button>Update</button>
        </div>
      </form>
    </div>
  );
};

export default TodoEdit;
