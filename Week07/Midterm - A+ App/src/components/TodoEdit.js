import update from '../icons/update.png';
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
        <div className="todo-edit-input-wrapper">
          <input onChange={handleChange} value={title} placeholder="Edit task" />
          <button className="submit-button">
            <img src={update} alt="Update" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default TodoEdit;
