import {useEffect, useState} from 'react';
import {
  addTodo,
  changeChecked,
  changeValue,
  listenToTodos,
  move,
  remove,
} from '../db/todos';
import {AutoHeightText} from './AutoHeightText';
import './todos.css';

export const Todos = ({onError}) => {
  const [todos, setTodos] = useState([]);
  useEffect(() => listenToTodos(setTodos, onError), []);
  const items = Object.entries(todos).sort((a, b) => a[1].order - b[1].order);
  return (
    <div className="todos">
      {items.map(([key, {value, checked = false}], index, arr) => (
        <div key={key}>
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => changeChecked(key, e.target.checked, onError)}
          />
          {checked ? (
            <span className="done">{value}</span>
          ) : (
            <AutoHeightText
              title="Edit Text"
              value={value}
              onChange={(e) => changeValue(key, e.target.value, onError)}
            />
          )}
          <a
            title="Move Up"
            style={{visibility: index === 0 ? 'hidden' : 'visible'}}
            onClick={() => move(index, arr, -1, onError)}
          >
            ↑
          </a>
          <a
            title="Move Down"
            style={{
              visibility: index === arr.length - 1 ? 'hidden' : 'visible',
            }}
            onClick={() => move(index, arr, 1, onError)}
          >
            ↓
          </a>
          <a
            title="Delete"
            onClick={() => {
              if (
                checked ||
                confirm(`Are you sure you want to delete "${value}"?`)
              ) {
                remove(key, onError);
              }
            }}
          >
            x
          </a>
        </div>
      ))}
      <button onClick={() => addTodo(items.length, onError)}>
        Add New Item
      </button>
    </div>
  );
};
