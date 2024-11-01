import React, { useState } from 'react';
import TodoItem from './TodoItem';
import TodoCreate from './TodoCreate';
import '../styles/TodoList.css';
import del from '../icons/delete.png';
import star from '../icons/star.png'; // Import star icon
import starClicked from '../icons/starClicked.png'; // Import filled star icon

const TodoList = (props) => {
  const { className, todos, onDelete, onEdit, onCreate, onDeleteClass, onStarClick } = props;
  const [starred, setStarred] = useState(false);

  const handleStarClick = () => {
    setStarred(!starred);
    onStarClick(); // Communicate with parent component to reorder
  };

  const handleDeleteList = () => {
    onDeleteClass(); // Delete entire class todo-list
  };

  const renderedContent = todos.map((todo) => (
    <div key={todo.id} className="todo-list-item">
      <TodoItem key={todo.id} todo={todo} onDelete={onDelete} onEdit={onEdit} />
    </div>
  ));

  return (
    <div className={`todo-list ${starred ? 'starred-list' : ''}`}>
      <div className="class-header">
        <h2>{className}</h2>
        <button
          className="todo-list-button-star"
          onClick={handleStarClick}
        >
          <img
            src={starred ? starClicked : star}
            alt={starred ? 'Starred' : 'Unstarred'}
          />
        </button>
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
