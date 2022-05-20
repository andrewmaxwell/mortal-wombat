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
  }
}

export class TileElement extends Element {
  constructor(parentElement, tile) {
    super();
    this.el.classList.add('tile');
    this.el.style.background = getBackground(tile.type);
    this.update(tile);
    parentElement.append(this.el);
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

export class BarElement extends Element {
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

export class JewelCounter extends Element {
  constructor(parentElement, typeIndex) {
    super();
    this.typeIndex = typeIndex;
    this.el.classList.add('jewelCounter');
    parentElement.append(this.el);
  }
  update(jewels) {
    this.el.innerHTML = `${jewels} <img src="${this.typeIndex.j.image}" />`;
  }
}

export class Hud extends Element {
  constructor(parentElement, typeIndex) {
    super();
    this.el.classList.add('hud');

    this.healthBar = new BarElement(this.el);
    this.poopBar = new BarElement(this.el);
    this.jewelCounter = new JewelCounter(this.el, typeIndex);
    parentElement.append(this.el);
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
