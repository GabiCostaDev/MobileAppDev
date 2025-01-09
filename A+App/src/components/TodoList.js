import TodoItem from './TodoItem';
import TodoCreate from './TodoCreate';
import '../styles/TodoList.css';
import del from '../icons/delete.png'; // Import delete icon

const TodoList = (props) => {
  const { className, todos, onDelete, onEdit, onCreate, onDeleteClass } = props;

  const renderedContent = todos.map((todo) => (
    <TodoItem key={todo.id} todo={todo} onDelete={onDelete} onEdit={onEdit} />
  ));

  const handleDeleteList = () => {
    onDeleteClass(); // Deletes the entire todo-list
  };

  return (
    <div className="todo-list">
      <div className="class-header">
        <h2>{className}</h2>
        <button className="todo-list-button-delete" onClick={handleDeleteList}>
          <img src={del} alt='Delete List'/>
        </button>
      </div>
      {renderedContent}
      <TodoCreate onCreate={onCreate} />
    </div>
  );
};

export default TodoList;
