export default class Array1DRandomizer {
  private readonly array: number[];

  constructor(length: number, min: number, max: number) {
    this.array = Array(length)
      .fill(0)
      .map((_) => Math.floor(Math.random() * (max - min + 1)) + min);
  }

  getArray(): number[] {
    return this.array;
  }
}
