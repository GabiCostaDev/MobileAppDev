import {useState} from 'react';
import TodoEdit from './TodoEdit';
import '../styles/TodoItem.css';
import edit from '../icons/edit.png';
import del from '../icons/delete.png';

const TodoItem = (props) => {
  const {todo, onDelete, onEdit} = props;
  const [showEdit, setShowEdit] = useState(false);

  const handleDelete = () => {
    onDelete(todo.id);
  };

  const handleShowEdit = () => {
    // for now, just hide show edit component
    setShowEdit(!showEdit);
  };

  const handleSubmit = (id, newTitle) => {
    onEdit(id, newTitle);
    handleShowEdit();
  };

  let content = <h3>{todo.title}</h3>;
  if (showEdit) {
    content = <TodoEdit todo={todo} onSubmit={handleSubmit} />;
  }

  return (
    <div className="todo-item">
      {content}
      {!showEdit && (
        <>
          <button className="todo-item-button-one" onClick={handleShowEdit}>
            <img src={edit} alt='Edit'/>
          </button>
          <button className="todo-item-button-two" onClick={handleDelete}>
            <img src={del} alt='Delete'/>
          </button>
        </>
      )}
    </div>
  );
};

export default TodoItem;
