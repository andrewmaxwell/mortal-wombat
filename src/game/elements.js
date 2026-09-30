import {getBackground} from '../utils/getBackground';

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
  clear() {
    this.el.replaceChildren();
    this.chunks = {};
  }
}

export class TileElement extends Element {
  constructor(tile, worldElement) {
    super();
    this.worldElement = worldElement;
    this.el.classList.add('tile');
    this.setBackground(tile.type);
    this.update(tile);
  }
  setBackground(type, imageProp = 'image') {
    this.el.style.background = getBackground(type, imageProp);
  }
  update({
    x,
    y,
    dirX = 0,
    dirY = 0,
    type,
    isJumping,
    isWalking,
    isPushing,
    isDigging,
  }) {
    const angle = Math.atan2(dirY, dirX) + Math.PI;
    const flip = angle >= 0.5 * Math.PI && angle <= 1.5 * Math.PI;
    this.el.style.transform = `
    translate(${x * TILE_SIZE}px,${y * TILE_SIZE}px)
    rotate(${angle}rad)
    ${flip ? 'scaleY(-1)' : ''}`;

    const image = isDigging
      ? 'diggingImage'
      : isJumping
        ? 'jumpingImage'
        : isPushing
          ? 'pushingImage'
          : isWalking
            ? 'walkingImage'
            : 'image';
    if (image !== this.pImage) {
      this.pImage = image;
      this.setBackground(type, image);
    }

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
      type,
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

export class YouDeadElement extends Element {
  constructor(parentElement) {
    super();
    this.el.classList.add('youDead');
    this.el.innerHTML = '<h1>you dead</h1><h2>press R or tap to try again</h2>';
    this.el.addEventListener('pointerdown', () => location.reload());
    parentElement.append(this.el);
  }
}

export class VersionElement extends Element {
  constructor(parentElement) {
    super();
    this.el.classList.add('version');
    this.el.innerText = 'v' + __APP_VERSION__;
    parentElement.append(this.el);
  }
}

// Errors in tile scripts, so world authors see them while play-testing. Tap to dismiss.
export class ScriptErrors extends Element {
  constructor(parentElement) {
    super();
    this.el.classList.add('scriptErrors');
    this.messages = new Set();
    this.el.addEventListener('pointerdown', () => this.clear());
    parentElement.append(this.el);
  }
  show(message) {
    if (this.messages.has(message)) return; // a broken onTouch fails on every contact
    this.messages.add(message);
    const line = document.createElement('div');
    line.textContent = message;
    this.el.append(line);
  }
  clear() {
    this.messages.clear();
    this.el.replaceChildren();
  }
}

export class Dialog extends Element {
  constructor(parentElement) {
    super();
    this.el.classList.add('dialog');

    this.div = document.createElement('div');
    this.div.classList.add('dialogContainer');
    this.el.append(this.div);

    // tapping or clicking advances the dialog, or picks the tapped choice
    this.el.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      const choice = e.target.closest('[data-choice]');
      if (choice) {
        this.choiceIndex = Number(choice.dataset.choice);
        this.choose();
      } else if (!this.hasChoices()) {
        this.hide();
      }
    });

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
  renderChoices() {
    const choices = this.choices
      .map(
        ({text}, i) =>
          `<li data-choice="${i}" ${
            i === this.choiceIndex ? `class="selected"` : ''
          }>${text}</li>`,
      )
      .join('');

    return choices ? `<ul>${choices}</ul>` : '';
  }
  render() {
    this.div.innerHTML = this.text + this.renderChoices();
  }
  choose() {
    this.hide();
    this.choices[this.choiceIndex].action?.(); // choice('No') has no action
  }
  hide() {
    this.el.style.display = 'none';
    this.isOpen = false;
  }
}
