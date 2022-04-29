import {useEffect, useState} from 'react';
import {listen, update} from '../firebase';
import {guid} from '../utils';
import {AutoHeightText} from './AutoHeightText';
import './todos.css';

const listenToTodos = (onChange, onError) => listen('todos', onChange, onError);

const changeValue = (key, value, onError) =>
  update({[`todos/${key}/value`]: value}, onError);

const remove = (key, onError) => update({[`todos/${key}`]: null}, onError);

const move = (index, arr, dir, onError) => {
  const [thisKey, {order: thisOrder}] = arr[index];
  const [nextKey, {order: nextOrder}] = arr[index + dir];
  update(
    {
      [`todos/${thisKey}/order`]: nextOrder,
      [`todos/${nextKey}/order`]: thisOrder,
    },
    onError
  );
};

const addTodo = (index, onError) =>
  update({[`todos/${guid()}`]: {value: 'New item', order: index}}, onError);

const changeChecked = (key, checked, onError) =>
  update({[`todos/${key}/checked`]: checked}, onError);

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
