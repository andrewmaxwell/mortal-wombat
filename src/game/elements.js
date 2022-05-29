import {getBackground} from '../utils/getBackground';
import packageJSON from '../../package.json';

const scale = 48;

class Element {
  constructor() {
    this.el = document.createElement('div');
  }
  destroy() {
    this.el.remove();
  }
}

export class WorldElement extends Element {
  constructor(rootElement) {
    super();
    rootElement.append(this.el);
  }
  update(you) {
    const cx = innerWidth / 2 - you.x * scale;
    const cy = innerHeight / 2 - you.y * scale;
    this.el.style.transform = `translate(${cx}px,${cy}px)`;
    document.body.style.backgroundPosition = `${cx >> 2}px ${cy >> 2}px`;
  }
}

export class TileElement extends Element {
  constructor(parentElement, tile) {
    super();
    this.el.classList.add('tile');
    this.updateType(tile.type);
    this.update(tile);
    parentElement.append(this.el);
  }
  updateType(type) {
    this.el.style.background = getBackground(type);
  }
  update({x, y, dirX = 0, dirY = 0}) {
    const angle = Math.atan2(dirY, dirX) + Math.PI;
    const flip = angle >= 0.5 * Math.PI && angle <= 1.5 * Math.PI;
    this.el.style.transform = `
    translate(${x * scale}px,${y * scale}px)
    rotate(${angle}rad)
    ${flip ? 'scaleY(-1)' : ''}`;
  }
}

class BarElement extends Element {
  constructor(parentElement) {
    super();
    this.el.classList.add('bar');
    this.valueElement = document.createElement('div');
    this.el.append(this.valueElement);
    parentElement.append(this.el);
  }
  update(value, maxValue, color) {
    const el = this.valueElement;
    el.style.background = color;
    el.style.width = (100 * value) / maxValue + '%';
    el.innerText = Math.floor(value);
  }
}

class CollectibleCounter extends Element {
  constructor(parentElement, type) {
    super();
    this.el.classList.add('collectibleCounter');
    this.el.innerHTML = `<span></span> <div style="background: ${getBackground(
      type
    )}"></div>`;
    this.valueEl = this.el.querySelector('span');
    parentElement.append(this.el);
  }
  update(value) {
    this.valueEl.innerText = value;
  }
}

export class Hud extends Element {
  constructor(parentElement) {
    super();
    this.el.classList.add('hud');

    this.healthBar = new BarElement(this.el);
    this.poopBar = new BarElement(this.el);
    parentElement.append(this.el);

    this.counters = {};
  }
  updateCounter(type, value) {
    if (!this.counters[type.id]) {
      this.counters[type.id] = new CollectibleCounter(this.el, type);
    }
    this.counters[type.id].update(value);
  }
}

export class VersionElement extends Element {
  constructor(parentElement) {
    super();
    this.el.classList.add('version');
    this.el.innerText = 'v' + packageJSON.version;
    parentElement.append(this.el);
  }
}

export class ControlButton extends Element {
  constructor(parentElement, id, pressing) {
    super();
    this.el.classList.add('control');
    this.el.setAttribute('id', id);
    this.el.addEventListener('touchstart', () => (pressing[id] = true));
    this.el.addEventListener('touchend', () => (pressing[id] = false));
    parentElement.append(this.el);
  }
}
