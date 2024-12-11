class Ship {
  constructor(length) {
    this._length = length;
    this._hits = 0;
  }

  getLength() {
    return this._length;
  }

  isSunk() {
    return this._hits >= this._length;
  }

  hit() {
    this._hits++;
  }
}
export { Ship };
