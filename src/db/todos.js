import {guid} from '../utils';
import {listen, update} from '../firebase';

// https://firebase.google.com/docs/database/web/read-and-write

export const listenToTodos = (onChange, onError) =>
  listen('todos', onChange, onError);

export const changeValue = (key, value, onError) =>
  update({[`todos/${key}/value`]: value}, onError);

export const remove = (key, onError) =>
  update({[`todos/${key}`]: null}, onError);

export const move = (index, arr, dir, onError) => {
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

export const addTodo = (index, onError) =>
  update({[`todos/${guid()}`]: {value: 'New item', order: index}}, onError);

export const changeChecked = (key, checked, onError) =>
  update({[`todos/${key}/checked`]: checked}, onError);
