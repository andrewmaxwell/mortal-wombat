const gamepadSettings = {
  spaceIndex: 0,
  jumpIndex: 1,
  poopIndex: 2,
  xAxisIndex: 0,
  yAxisIndex: 1,
};

export class GamepadControls {
  constructor({onPress}) {
    this.onPress = onPress;
    this.lastGamepadState = {};
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
  getGamepadState() {
    const gamepad = this.getGamepad();
    if (gamepad == null) return undefined;

    return {
      up:
        gamepad.axes[gamepadSettings.yAxisIndex] <= -0.5 ||
        gamepad.buttons[gamepadSettings.jumpIndex].pressed,
      down: gamepad.axes[gamepadSettings.yAxisIndex] >= 0.5,
      left: gamepad.axes[gamepadSettings.xAxisIndex] <= -0.25,
      right: gamepad.axes[gamepadSettings.xAxisIndex] >= 0.25,
      space: gamepad.buttons[gamepadSettings.spaceIndex].pressed,
      poop: gamepad.buttons[gamepadSettings.poopIndex].pressed,
    };
  }
  getPressing(incomingPressing) {
    const gamepadState = this.getGamepadState();
    if (!gamepadState) return incomingPressing;

    // Merge the incoming pressing state with the gamepad state
    const pressing = {...incomingPressing};

    const gamepadPress = (id) => {
      pressing[id] = true;
      if (!this.lastGamepadState[id]) {
        this.onPress(id);
      }
    };

    if (gamepadState.up) gamepadPress('up');
    if (gamepadState.down) gamepadPress('down');
    if (gamepadState.left) gamepadPress('left');
    if (gamepadState.right) gamepadPress('right');
    if (gamepadState.space) gamepadPress('space');
    if (gamepadState.poop) gamepadPress('poop');

    this.lastGamepadState = gamepadState;
    return pressing;
  }
}
