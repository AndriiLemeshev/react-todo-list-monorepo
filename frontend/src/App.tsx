import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  return (
    <div className="container">
      <header>
        <h1>TODO List</h1>
      </header>
      <div className="search-bar">
        <input type="text" id="search-input" placeholder="Search..." />
        <button id="clean-button">Clean</button>
      </div>
      <ul id="todo-list">
      <li className="todo-item">List of test items</li>
      <li className="todo-item-checked">Checked item</li>
      <li className="todo-item">Unchecked item</li>
      </ul>
      <div className="add-item">
        <input type="text" id="new-item-input" placeholder="New item..." />
        <button id="add-button">Add</button>
      </div>
    </div>
  );
}

export default App
