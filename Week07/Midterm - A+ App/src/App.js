import { useState } from 'react';
import TodoCreate from './components/TodoCreate';
import TodoList from './components/TodoList';
import TodoClass from './components/TodoClass';
import logo from './icons/logo.png';
import './App.css';

const App = () => {
  const [classLists, setClassLists] = useState({});

  const handleAddClass = (className) => {
    setClassLists({ ...classLists, [className]: [] });
  };

  const handleDeleteClass = (classNameToDelete) => {
    const updatedClassLists = { ...classLists };
    delete updatedClassLists[classNameToDelete];
    setClassLists(updatedClassLists);
  };

  const createTodo = (className, title) => {
    const updatedTodos = [
      ...classLists[className],
      { id: Math.round(Math.random() * 999999), title }
    ];
    setClassLists({ ...classLists, [className]: updatedTodos });
  };

  const deleteTodoById = (className, id) => {
    const updatedTodos = classLists[className].filter((todo) => todo.id !== id);
    setClassLists({ ...classLists, [className]: updatedTodos });
  };

  const editTodoById = (className, id, newTitle) => {
    const updatedTodos = classLists[className].map((todo) => {
      if (todo.id === id) {
        return { ...todo, title: newTitle };
      }
      return todo;
    });
    setClassLists({ ...classLists, [className]: updatedTodos });
  };

  return (
    <div className="app">
      <header className="app-header">
        <div><img src={logo} alt='Logo' /></div>
        <div>Homework</div>
        <TodoClass onAddClass={handleAddClass} />
      </header>
      {Object.keys(classLists).map((className) => (
        <TodoList
          key={className}
          className={className}
          todos={classLists[className]}
          onDelete={(id) => deleteTodoById(className, id)}
          onEdit={(id, newTitle) => editTodoById(className, id, newTitle)}
          onCreate={(title) => createTodo(className, title)}
          onDeleteClass={() => handleDeleteClass(className)} // Pass down the delete function
        />
      ))}
      <footer></footer>
    </div>
  );
}

export default App;
