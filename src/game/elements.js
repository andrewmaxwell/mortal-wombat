import {getBackground} from '../utils/getBackground';
import packageJSON from '../../package.json';

const TILE_SIZE = 48;
const CHUNK_SIZE = 24;

const toChunkCoords = (x, y) => [
  Math.floor(x / CHUNK_SIZE),
  Math.floor(y / CHUNK_SIZE),
];

class Element {
  constructor() {
    this.el = document.createElement('div');
  }
  destroy() {
    this.el.remove();
  }
}

class Chunk extends Element {
  constructor(parentElement, x, y) {
    super();
    this.x = x;
    this.y = y;
    this.el.classList.add('chunk');
    parentElement.append(this.el);
  }
  updateVisibility(x, y) {
    const shouldShow = Math.abs(x - this.x) < 2 && Math.abs(y - this.y) < 2;
    this.el.title = `chunk ${this.x}_${this.y} ${x} ${y}`;
    if (shouldShow !== this.isShowing) {
      this.isShowing = shouldShow;
      this.el.style.display = shouldShow ? 'block' : 'none';
    }
  }
}

export class WorldElement extends Element {
  constructor(rootElement) {
    super();
    this.chunks = {};
    rootElement.append(this.el);
  }
  update(you) {
    const [chunkX, chunkY] = toChunkCoords(you.x, you.y);
    if (chunkX !== you.chunkX || chunkY !== you.chunkY) {
      you.chunkX = chunkX;
      you.chunkY = chunkY;
      for (const key in this.chunks) {
        this.chunks[key].updateVisibility(chunkX, chunkY);
      }
    }

    const cx = Math.round(innerWidth / 2 - you.x * TILE_SIZE);
    const cy = Math.round(innerHeight / 2 - you.y * TILE_SIZE);
    this.el.style.transform = `translate(${cx}px,${cy}px)`;
    document.body.style.backgroundPosition = `${cx >> 2}px ${cy >> 2}px`;
  }
  getChunk(x, y) {
    const [chunkX, chunkY] = toChunkCoords(x, y);
    const key = `${chunkX}_${chunkY}`;
    return (this.chunks[key] =
      this.chunks[key] || new Chunk(this.el, chunkX, chunkY));
  }
}

export class TileElement extends Element {
  constructor(tile, worldElement) {
    super();
    this.worldElement = worldElement;
    this.el.classList.add('tile');
    this.updateType(tile.type);
    this.update(tile);
  }
  updateType(type) {
    this.el.style.background = getBackground(type);
  }
  update({x, y, dirX = 0, dirY = 0}) {
    const angle = Math.atan2(dirY, dirX) + Math.PI;
    const flip = angle >= 0.5 * Math.PI && angle <= 1.5 * Math.PI;
    this.el.style.transform = `
    translate(${x * TILE_SIZE}px,${y * TILE_SIZE}px)
    rotate(${angle}rad)
    ${flip ? 'scaleY(-1)' : ''}`;

    const [chunkX, chunkY] = toChunkCoords(x, y);
    if (chunkX !== this.chunkX || chunkY !== this.chunkY) {
      this.chunkX = chunkX;
      this.chunkY = chunkY;
      this.worldElement.getChunk(x, y).el.append(this.el);
    }
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
    el.innerText = value;
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

export class Dialog extends Element {
  constructor(parentElement) {
    super();
    this.el.classList.add('dialog');

    this.div = document.createElement('div');
    this.div.classList.add('dialogContainer');
    this.el.append(this.div);

    this.hide();
    parentElement.append(this.el);
  }
  say(text) {
    this.text = text;
    this.choices = [];
    this.choiceIndex = 0;
    this.render();
    this.el.style.display = 'block';
    this.isOpen = true;
  }
  choice(text, action) {
    this.choices.push({text, action});
    this.render();
  }
  hasChoices() {
    return this.choices.length > 0;
  }
  next() {
    if (this.choices.length) {
      this.choiceIndex = (this.choiceIndex + 1) % this.choices.length;
      this.render();
    } else {
      this.hide();
    }
  }
  render() {
    this.div.innerHTML = `
    <div>${this.text}</div>
    <ul>
    ${this.choices
      .map(
        ({text}, i) =>
          `<li ${i === this.choiceIndex ? `class="selected"` : ''}>${text}</li>`
      )
      .join('')}
        </ul>
        `;
  }
  choose() {
    this.hide();
    this.choices[this.choiceIndex].action();
  }
  hide() {
    this.el.style.display = 'none';
    this.isOpen = false;
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

export class ControlCircle extends Element {
  constructor(parentElement, pressing) {
    super();
    this.el.classList.add('controlCircle');

    const move = ({touches, offsetX, offsetY}) => {
      const size = this.el.clientWidth;
      const x = (touches ? touches[0].offsetX : offsetX) / size - 0.5;
      const y = (touches ? touches[0].offsetY : offsetY) / size - 0.5;
      pressing.left = x < 0;
      pressing.right = x > 0;
      pressing.up = y < 0;
      pressing.down = y > 0;
      this.el.innerText = JSON.stringify(touches);
    };
    const up = () => {
      pressing.left = false;
      pressing.up = false;
      pressing.down = false;
      pressing.right = false;
      this.el.removeEventListener('touchmove', move);
      this.el.removeEventListener('mousemove', move);
      this.el.removeEventListener('touchend', up);
      this.el.removeEventListener('mouseup', up);
    };
    const down = (e) => {
      move(e);
      this.el.addEventListener('touchmove', move);
      this.el.addEventListener('mousemove', move);
      this.el.addEventListener('touchend', up);
      this.el.addEventListener('mouseup', up);
    };

    this.el.addEventListener('touchstart', down);
    this.el.addEventListener('mousedown', down);
    parentElement.append(this.el);
  }
}
