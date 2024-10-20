import {useState} from 'react';
import TodoCreate from './components/TodoCreate';
import TodoList from './components/TodoList';
import './App.css';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [classes, setClasses] = useState([]);

  const createTodo = (title) => {
    const updatedTodos = [
      ...todos,
      {id: Math.round(Math.random() * 999999), title},
    ];
    setTodos(updatedTodos);
  }

  const deleteTodoById = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }

  const editTodoById = (id, newTitle) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {...todo, title: newTitle};
      }
      return todo;
    });
    setTodos(updatedTodos);
  }

  return (
    <div className="App">
      <header className="app-header">
        <div>Homework</div>
      </header>
      {todos.length}
      {classes.map((classItem, index) => (
        <div key={index} className="class-item">{classItem}</div>
      ))}
      <TodoList todos={todos} onDelete={deleteTodoById} onEdit={editTodoById} />
      <TodoCreate onCreate={createTodo} />
    </div>
  );
}

export default App;
