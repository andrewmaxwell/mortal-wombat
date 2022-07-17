import {indexBy} from '../utils';
import {ControlCircle} from './elements';

const showControls = false;

const controls = [
  {id: 'left', key: 'A', code: 'KeyA'},
  {id: 'right', key: 'D', code: 'KeyD'},
  {id: 'up', key: 'W', code: 'KeyW'},
  {id: 'down', key: 'S', code: 'KeyS'},
  {id: 'poop', key: 'P', code: 'KeyP'},
  {id: 'space', key: 'Space', code: 'Space'},
  {id: 'reload', key: 'R', code: 'KeyR'},
];

const controlIndex = indexBy((c) => c.code, controls);

export class Controls {
  constructor({onPress}, rootElement) {
    this.pressing = {};
    this.onPress = onPress;
    this.lastPoop = false;
    const keydown = (e) => {
      if (controlIndex[e.code]) {
        this.pressing[controlIndex[e.code].id] = e.type === 'keydown';
      }
    };
    window.addEventListener('keydown', keydown);
    window.addEventListener('keyup', keydown);
    window.addEventListener('keypress', (e) => {
      if (controlIndex[e.code]) {
        onPress(controlIndex[e.code].id);
      }
    });

    if (showControls) {
      // for (const {id} of controls) {
      //   new ControlButton(rootElement, id, this.pressing);
      // }

      new ControlCircle(rootElement, this.pressing, 400);
    }
  }
  getPressing() {
    const gamepadState = this.getGamepadState();
    if (!gamepadState) return this.pressing;

    // Merge the keyboard state with the joystick state
    const controlState = {...this.pressing};
    if (gamepadState.action) {
      controlState.space = true;
      this.onPress('space');
    }
    if (gamepadState.jump || gamepadState.up) controlState.up = true;
    if (gamepadState.poop) {
      controlState.poop = true;
      if (!this.lastPoop) {
        this.lastPoop = true;
        this.onPress('poop');
      }
    } else {
      this.lastPoop = false;
    }
    if (gamepadState.left) controlState.left = true;
    if (gamepadState.right) controlState.right = true;
    if (gamepadState.down) controlState.down = true;

    return controlState;
  }
  getGamepadState() {
    const gamepad = this.getGamepad();
    if (gamepad == null) return undefined;

    const gamepadSettings = {
      actionIndex: 0,
      jumpIndex: 1,
      poopIndex: 2,
      xAxisIndex: 0,
      yAxisIndex: 1,
    };
    return {
      action: gamepad.buttons[gamepadSettings.actionIndex].pressed,
      jump: gamepad.buttons[gamepadSettings.jumpIndex].pressed,
      poop: gamepad.buttons[gamepadSettings.poopIndex].pressed,
      left: gamepad.axes[gamepadSettings.xAxisIndex] <= -0.25,
      right: gamepad.axes[gamepadSettings.xAxisIndex] >= 0.25,
      down: gamepad.axes[gamepadSettings.yAxisIndex] >= 0.5,
      up: gamepad.axes[gamepadSettings.yAxisIndex] <= -0.5,
    };
  }
  getGamepad() {
    const gamepads = navigator.getGamepads();
    for (let index = 0; index < gamepads.length; index++) {
      if (gamepads[index] != null && gamepads[index].connected) {
        return gamepads[index];
      }
    }
    return null;
  }
}
