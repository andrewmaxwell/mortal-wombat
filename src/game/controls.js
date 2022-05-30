import {indexBy} from '../utils';
import {ControlCircle} from './elements';

const showControls = false;

const controls = [
  {id: 'left', key: 'A', code: 'KeyA'},
  {id: 'right', key: 'D', code: 'KeyD'},
  {id: 'up', key: 'W', code: 'KeyW'},
  {id: 'down', key: 'S', code: 'KeyS'},
  {id: 'poop', key: 'P', code: 'KeyP'},
  {id: 'attack', key: 'Space', code: 'Space'},
  {id: 'reload', key: 'R', code: 'KeyR'},
];

const controlIndex = indexBy((c) => c.code, controls);

export class Controls {
  constructor({onPress}, rootElement) {
    this.pressing = {};
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
    return this.pressing;
  }
}
