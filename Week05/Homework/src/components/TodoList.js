import TodoItem from './TodoItem';
import TodoCreate from './TodoCreate';
import '../styles/TodoList.css';

const TodoList = (props) => {
  const { className, todos, onDelete, onEdit, onCreate, onDeleteClass } = props;

  const renderedContent = todos.map((todo) => (
    <TodoItem key={todo.id} todo={todo} onDelete={onDelete} onEdit={onEdit} />
  ));

  return (
    <div className="todo-list">
      <div className="class-header">
        <h2>{className}</h2>
      </div>
      {renderedContent}
      <TodoCreate onCreate={onCreate} />
    </div>
  );
};

export default TodoList;
