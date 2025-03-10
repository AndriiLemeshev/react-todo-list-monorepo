import { ChangeEvent, useEffect, useRef, useState } from 'react';
import './App.sass'

interface ToDoItem {
  id?: number;
  label: string;
  checked: boolean;
}

type ToDoItemProps = ToDoItem & {
  handle: (id : number) => void;
};

const HEADERS = new Headers();
HEADERS.append('Content-Type', 'application/json; charset=utf-8');

const TodoListItem: React.FC<ToDoItemProps> = ({id, label, checked, handle}) => <li
  className={'todo-item' + (checked ? '-checked' : '')}
  onClick={() => handle(id!)}
>{label}</li>;

function App() {
  const [count, setCount] = useState(0);
  const [list, setList] = useState<ToDoItem[]>([]);
  const [filter, setFilter] = useState('');
  const [label, setLabel] = useState('');
  const initialized = useRef(false);

    // fetch('/api/todo/count')
    //   .then(resp => resp.json())
    //   .then(({count}) => count)
    //   .then(setCount);
    // fetch('/api/todo/all')
    //   .then(resp => resp.json())
    //   .then(setList);

  const load = (label: string) => {
    fetch('/api/todo/count', {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({ label })
    })
      .then(resp => resp.json())
      .then(({count}) => count)
      .then(setCount);
    fetch('/api/todo/find', {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({ label })
    })
      .then(resp => resp.json())
      .then(setList)
  };

  const tapItem = (id: number) => {
    const item = list.find(it => it.id === id);
    fetch('/api/todo/' + id, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({ ...item, checked: !item?.checked })
    }).then(() => load(filter))
  }

  const clean = () => fetch('/api/todo/clean', { method: 'POST', headers: HEADERS }).then(() => load(filter));

  const add = () => fetch('/api/todo', {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({ label, checked: false })
  }).then(() => {
    load(filter);
    setLabel('');
  });

  const filterHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const filter = e.target.value;
    load(filter);
    setFilter(filter);
  }

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    load('');
  }, []);

  return (
    <div className="container">
      <header>
        <h1>TODO List ({count})</h1>
      </header>
      <div className="search-bar">
        <input type="text" id="search-input" placeholder="Search..." value={filter} onChange={filterHandler} />
        <button id="clean-button" onClick={clean}>Clean</button>
      </div>
      <ul id="todo-list">
        {list.map(({id, label, checked}) => <TodoListItem key={'k' + id} id={id} label={label} checked={checked} handle={tapItem} />)}
      </ul>
      <div className="add-item">
        <input type="text" id="new-item-input" placeholder="New item..." value={label} onChange={e => setLabel(e.target.value)} />
        <button id="add-button" onClick={add}>Add</button>
      </div>
    </div>
  );
}

export default App
