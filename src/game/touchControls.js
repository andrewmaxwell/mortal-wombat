// On-screen controls for touch screens: a direction pad on the left, and jump/dig/poop buttons
// on the right. Pointer events, so each finger is tracked separately (and a mouse works too).

const DEAD_ZONE = 0.3; // fraction of the pad's radius that counts as no direction

const buttons = [
  {id: 'up', label: 'jump'},
  {id: 'space', label: 'dig'},
  {id: 'poop', label: '💩'},
];

const directions = ['left', 'right', 'up', 'down'];

// Tracks one pointer per element: pressed from pointerdown until pointerup/cancel.
const onHold = (el, {down, move, up}) => {
  let pointerId;
  el.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    pointerId = e.pointerId;
    el.setPointerCapture?.(pointerId);
    down(e);
  });
  el.addEventListener('pointermove', (e) => {
    if (e.pointerId === pointerId) move?.(e);
  });
  const release = (e) => {
    if (e.pointerId !== pointerId) return;
    pointerId = undefined;
    up();
  };
  el.addEventListener('pointerup', release);
  el.addEventListener('pointercancel', release);
};

export class TouchControls {
  constructor({onPress}, rootElement) {
    this.onPress = onPress;
    this.pad = {};
    this.buttons = {};
    // pressed since the last getPressing, so a tap shorter than a frame still counts
    this.latched = {};
    this.rootElement = rootElement;

    if (window.matchMedia?.('(pointer: coarse)').matches) {
      this.show();
    } else {
      // e.g. a laptop with a touch screen
      const onTouch = (e) => {
        if (e.pointerType !== 'touch') return;
        window.removeEventListener('pointerdown', onTouch);
        this.show();
      };
      window.addEventListener('pointerdown', onTouch);
    }
  }
  show() {
    const el = document.createElement('div');
    el.className = 'touchControls';
    el.innerHTML = `
      <div class="touchPad"><span>▲</span><span>◀</span><span>▶</span><span>▼</span></div>
      <div class="touchButtons">${buttons
        .map(({id, label}) => `<div data-id="${id}">${label}</div>`)
        .join('')}</div>`;
    this.rootElement.append(el);
    this.el = el;

    const pad = el.querySelector('.touchPad');
    const aim = (e) => {
      const rect = pad.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const threshold = DEAD_ZONE / 2;
      this.setPad({
        left: x < -threshold,
        right: x > threshold,
        up: y < -threshold,
        down: y > threshold,
      });
    };
    onHold(pad, {down: aim, move: aim, up: () => this.setPad({})});

    for (const button of el.querySelectorAll('[data-id]')) {
      const {id} = button.dataset;
      onHold(button, {
        down: () => {
          button.classList.add('pressed');
          this.buttons[id] = true;
          this.latched[id] = true;
          this.onPress(id);
        },
        up: () => {
          button.classList.remove('pressed');
          this.buttons[id] = false;
        },
      });
    }
  }
  setPad(pad) {
    for (const id of directions) {
      if (pad[id] && !this.pad[id]) {
        this.latched[id] = true;
        this.onPress(id);
      }
    }
    this.pad = pad;
  }
  getPressing(incomingPressing) {
    const pressing = {...incomingPressing};
    for (const state of [this.pad, this.buttons, this.latched]) {
      for (const id in state) {
        if (state[id]) pressing[id] = true;
      }
    }
    this.latched = {};
    return pressing;
  }
}
