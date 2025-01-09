import '../styles/TodoClass.css';
import { useState } from 'react';
import add from '../icons/add.png';

const TodoClass = (props) => {
  const { onAddClass } = props;
  const [showInput, setShowInput] = useState(false);
  const [className, setClassName] = useState('');

  const handleChange = (event) => {
    setClassName(event.target.value);
  }

  const handleButtonClick = (event) => {
    if (showInput) {
      if (className.trim()) {
        event.preventDefault();
        onAddClass(className);
        setClassName('');
        setShowInput(false);
      } else {
        setShowInput(false);
      }
    } else {
      setShowInput(true);
    }
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && className.trim()) {
      event.preventDefault();
      onAddClass(className);
      setClassName('');
      setShowInput(false);
    }
  }

  return (
    <div className="todo-class">
      {showInput && (
        <div className="todo-class-input-wrapper">
          <input
            type="text"
            placeholder="Add new class"
            onChange={handleChange}
            value={className}
            onKeyPress={handleKeyPress}
          />
          <button onClick={handleButtonClick} className="submit-button">
            <img src={add} alt='Add Class'/>
          </button>
        </div>
      )}
      {!showInput && (
        <button onClick={handleButtonClick}>
          <img src={add} alt='Add Class'/>
        </button>
      )}
    </div>
  );
}

export default TodoClass;
