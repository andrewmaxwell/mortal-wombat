import {getBackground} from '../utils/getBackground';
import packageJSON from '../../package.json';

const scale = 48;

export class WorldElement {
  constructor(rootElement) {
    this.el = document.createElement('div');
    rootElement.append(this.el);
  }
  update(you) {
    const cx = innerWidth / 2 - you.x * scale;
    const cy = innerHeight / 2 - you.y * scale;
    this.el.style.transform = `translate(${cx}px,${cy}px)`;
  }
  destroy() {
    this.el.remove();
  }
}

export class TileElement {
  constructor(parentElement, tile) {
    this.el = document.createElement('div');
    this.el.classList.add('tile');
    this.updatePosition(tile);
    this.updateType(tile);
    parentElement.append(this.el);
  }
  updatePosition({x, y}) {
    this.el.style.transform = `translate(${x * scale}px, ${y * scale}px)`;
  }
  updateType({type}) {
    this.el.style.background = getBackground(type);
  }
  destroy() {
    this.el.remove();
  }
}

export class YouElement {
  constructor(parentElement, typeIndex) {
    this.el = document.createElement('div');
    this.el.style.background = getBackground(typeIndex.w);
    this.el.classList.add('tile');
    parentElement.append(this.el);
  }
  update(you) {
    const wombatAngle = Math.atan2(you.dirY, you.dirX) + Math.PI;
    const wombatFlip =
      wombatAngle >= 0.5 * Math.PI && wombatAngle <= 1.5 * Math.PI;
    this.el.style.transform = `
    translate(${you.x * scale}px,${you.y * scale}px)
    rotate(${wombatAngle}rad)
    ${wombatFlip ? 'scaleY(-1)' : ''}`;
  }
  destroy() {
    this.el.remove();
  }
}

export class BarElement {
  constructor(parentElement) {
    this.el = document.createElement('div');
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
  destroy() {
    this.el.remove();
  }
}

export class JewelCounter {
  constructor(parentElement, typeIndex) {
    this.typeIndex = typeIndex;
    this.el = document.createElement('div');
    this.el.classList.add('jewelCounter');
    parentElement.append(this.el);
  }
  update(jewels) {
    this.el.innerHTML = `${jewels} <img src="${this.typeIndex.j.image}" />`;
  }
  destroy() {
    this.el.remove();
  }
}

export class Hud {
  constructor(parentElement, typeIndex) {
    this.el = document.createElement('div');
    this.el.classList.add('hud');

    this.healthBar = new BarElement(this.el);
    this.poopBar = new BarElement(this.el);
    this.jewelCounter = new JewelCounter(this.el, typeIndex);
    parentElement.append(this.el);
  }
}

export class VersionElement {
  constructor(parentElement) {
    const versionElement = document.createElement('div');
    versionElement.classList.add('version');
    versionElement.innerText = 'v' + packageJSON.version;
    parentElement.append(versionElement);
  }
}
