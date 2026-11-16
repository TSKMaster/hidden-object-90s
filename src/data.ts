export interface ItemDefinition { name: string; image: string }
export interface Placement {
  id: string;
  itemId: string;
  x: number;
  y: number;
  scale: number;
  rotation: number;
}
export interface Level {
  id: string;
  background: string;
  width: number;
  height: number;
  items: Placement[];
}

export const library: Record<string, ItemDefinition> = {
  cassette: { name: 'Кассета', image: 'assets/items/cassette.svg' },
  phone: { name: 'Телефон', image: 'assets/items/phone.svg' },
  mug: { name: 'Кружка', image: 'assets/items/mug.svg' },
  clock: { name: 'Будильник', image: 'assets/items/clock.svg' },
  book: { name: 'Книга', image: 'assets/items/book.svg' },
  key: { name: 'Ключ', image: 'assets/items/key.svg' },
  ball: { name: 'Мяч', image: 'assets/items/ball.svg' },
  radio: { name: 'Радио', image: 'assets/items/radio.svg' },
  pencil: { name: 'Карандаш', image: 'assets/items/pencil.svg' },
  comb: { name: 'Расчёска', image: 'assets/items/comb.svg' },
};

export const level: Level = {
  id: 'test-room', background: 'assets/room.svg', width: 1000, height: 700,
  items: [
    { id: 'cassette-1', itemId: 'cassette', x: 190, y: 425, scale: 0.85, rotation: -12 },
    { id: 'phone-1', itemId: 'phone', x: 785, y: 450, scale: 1.1, rotation: 0 },
    { id: 'mug-1', itemId: 'mug', x: 585, y: 420, scale: 0.8, rotation: 8 },
    { id: 'clock-1', itemId: 'clock', x: 825, y: 185, scale: 0.9, rotation: 0 },
    { id: 'book-1', itemId: 'book', x: 450, y: 460, scale: 0.9, rotation: 15 },
    { id: 'key-1', itemId: 'key', x: 670, y: 570, scale: 0.7, rotation: -25 },
    { id: 'ball-1', itemId: 'ball', x: 155, y: 600, scale: 1, rotation: 20 },
    { id: 'radio-1', itemId: 'radio', x: 350, y: 185, scale: 1, rotation: 0 },
    { id: 'pencil-1', itemId: 'pencil', x: 515, y: 590, scale: 0.8, rotation: 30 },
    { id: 'comb-1', itemId: 'comb', x: 860, y: 605, scale: 0.85, rotation: -15 },
  ],
};
