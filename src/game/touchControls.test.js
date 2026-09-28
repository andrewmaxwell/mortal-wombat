import {beforeEach, expect, test, vi} from 'vitest';
import {Dialog} from './elements';
import {TouchControls} from './touchControls';

// jsdom has no PointerEvent layout or matchMedia, so build the events and stub what's needed
const pointer = (el, type, props = {}) =>
  el.dispatchEvent(
    Object.assign(new Event(type, {bubbles: true, cancelable: true}), {
      pointerId: 1,
      pointerType: 'touch',
      ...props,
    }),
  );

let root, onPress, controls;

beforeEach(() => {
  document.body.innerHTML = '<div id="root"></div>';
  root = document.querySelector('#root');
  window.matchMedia = () => ({matches: true});
  onPress = vi.fn();
  controls = new TouchControls({onPress}, root);
});

const button = (id) => root.querySelector(`[data-id="${id}"]`);

const pad = () => {
  const el = root.querySelector('.touchPad');
  el.getBoundingClientRect = () => ({left: 0, top: 0, width: 100, height: 100});
  return el;
};

test('a button is held from pointerdown to pointerup', () => {
  pointer(button('space'), 'pointerdown');
  expect(onPress).toHaveBeenCalledWith('space');
  expect(controls.getPressing({}).space).toBe(true);

  pointer(button('space'), 'pointerup');
  expect(controls.getPressing({}).space).toBeFalsy();
});

test('a tap shorter than a frame is still seen once', () => {
  pointer(button('up'), 'pointerdown');
  pointer(button('up'), 'pointerup');
  expect(controls.getPressing({}).up).toBe(true);
  expect(controls.getPressing({}).up).toBeFalsy();
});

test('the pad presses the directions it is pushed toward', () => {
  const el = pad();
  pointer(el, 'pointerdown', {clientX: 90, clientY: 10});
  expect(controls.getPressing({})).toMatchObject({right: true, up: true});
  expect(controls.getPressing({}).left).toBeFalsy();

  pointer(el, 'pointermove', {clientX: 10, clientY: 50});
  expect(controls.getPressing({})).toMatchObject({left: true});
  expect(controls.getPressing({}).up).toBeFalsy();

  pointer(el, 'pointerup');
  expect(controls.getPressing({})).toEqual({});
});

test('two fingers can hold the pad and a button at once', () => {
  pointer(pad(), 'pointerdown', {clientX: 90, clientY: 50, pointerId: 1});
  pointer(button('up'), 'pointerdown', {pointerId: 2});
  expect(controls.getPressing({})).toMatchObject({right: true, up: true});

  // lifting the jump finger doesn't release the pad
  pointer(button('up'), 'pointerup', {pointerId: 2});
  pointer(pad(), 'pointerup', {pointerId: 2});
  expect(controls.getPressing({})).toMatchObject({right: true});
});

test('keyboard state is kept', () => {
  expect(controls.getPressing({left: true})).toEqual({left: true});
});

test('tapping a dialog choice picks it', () => {
  const dialog = new Dialog(root);
  const a = vi.fn();
  const b = vi.fn();
  dialog.say('pick one');
  dialog.choice('a', a);
  dialog.choice('b', b);

  pointer(dialog.el.querySelector('[data-choice="1"]'), 'pointerdown');
  expect(b).toHaveBeenCalled();
  expect(a).not.toHaveBeenCalled();
  expect(dialog.isOpen).toBe(false);
});

test('tapping a dialog without choices closes it', () => {
  const dialog = new Dialog(root);
  dialog.say('hello');
  pointer(dialog.el, 'pointerdown');
  expect(dialog.isOpen).toBe(false);
});
