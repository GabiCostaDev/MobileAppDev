import '../styles/TodoCreate.css'; // Path to CSS file
import send from '../icons/arrow.png';

import {useState} from 'react'
const TodoCreate = (props) => {
  const {onCreate} = props
  const [title, setTitle] = useState('')

  const handleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleSubmit = (event) => {
    // make sure the form doesnt refresh the page
    event.preventDefault()
    onCreate(title)
    // clear out the form
    setTitle('')
  }
  return (
    <div className="todo-create">
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Write new task" onChange={handleChange} value={title} />
        <button><img src={send} alt='Add'/></button>
      </form>
    </div>
  )
}

export default TodoCreate