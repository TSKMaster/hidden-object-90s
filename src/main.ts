import Phaser from 'phaser';
import { level, library } from './data';
import './style.css';

const list = document.querySelector<HTMLUListElement>('#items')!;
const progress = document.querySelector<HTMLElement>('#progress')!;
const result = document.querySelector<HTMLElement>('#result')!;
const restart = document.querySelector<HTMLButtonElement>('#restart')!;
const parent = document.querySelector<HTMLElement>('#game')!;

class SearchScene extends Phaser.Scene {
  private found = new Set<string>();

  preload() {
    this.load.image('background', level.background);
    for (const itemId of new Set(level.items.map(item => item.itemId))) {
      this.load.image(itemId, library[itemId].image);
    }
    this.load.on('loaderror', () => {
      result.textContent = 'Не удалось загрузить изображения. Обновите страницу.';
    });
  }

  create() {
    this.found.clear();
    list.replaceChildren();
    result.textContent = '';
    this.add.image(0, 0, 'background').setOrigin(0).setDisplaySize(level.width, level.height);
    for (const placement of level.items) {
      const definition = library[placement.itemId];
      const row = document.createElement('li');
      const icon = document.createElement('img');
      icon.src = definition.image;
      icon.alt = '';
      const label = document.createElement('span');
      label.textContent = definition.name;
      const mark = document.createElement('span');
      mark.className = 'mark';
      mark.textContent = '○';
      mark.setAttribute('aria-label', 'Не найден');
      row.append(icon, label, mark);
      list.append(row);

      const image = this.add.image(placement.x, placement.y, placement.itemId)
        .setScale(placement.scale).setAngle(placement.rotation)
        .setInteractive({ pixelPerfect: true, alphaTolerance: 1, useHandCursor: true });
      image.on('pointerdown', () => {
        if (this.found.has(placement.id)) return;
        this.found.add(placement.id);
        row.classList.add('found');
        mark.textContent = '✓';
        mark.setAttribute('aria-label', 'Найден');
        this.updateProgress();
      });
    }
    this.updateProgress();
    const reset = () => this.scene.restart();
    restart.addEventListener('click', reset);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => restart.removeEventListener('click', reset));
  }

  private updateProgress() {
    progress.textContent = `Найдено ${this.found.size} из ${level.items.length}`;
    result.textContent = this.found.size === level.items.length ? 'Все предметы найдены!' : '';
  }
}

const game = new Phaser.Game({
  type: Phaser.AUTO,
  parent,
  backgroundColor: '#282923',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: level.width,
    height: level.height,
  },
  scene: SearchScene,
});

// The sidebar and browser chrome can change the available space independently of window size.
const observer = new ResizeObserver(() => game.scale.refresh());
observer.observe(parent);
if (import.meta.hot) import.meta.hot.dispose(() => { observer.disconnect(); game.destroy(true); });
