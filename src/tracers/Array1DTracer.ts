import Tracer from "./Tracer";
import { type Array1DTracerStates, type ArrayNode, Renderers } from "../types";

export default class Array1DTracer extends Tracer {
  private array: ArrayNode[];
  readonly states: Array1DTracerStates;

  constructor(title: string) {
    super(title, Renderers.Array1DRenderer);
    this.array = [];
    this.states = [];
  }

  override captureState(): void {
    this.states.push(structuredClone(this.array));
  }

  override nop(): void {
    this.states.push(null);
  }

  /**
   * Sets the internal array.
   * @param array The array to be traced.
   */
  setArray(array: number[]): void {
    this.array = array.map((n) => {
      return {
        value: n,
        selected: false,
        changed: false,
      };
    });
  }

  /**
   * Selects all the nodes at the given indexes in the array.
   * @param indexes The indexes of the nodes to be selected.
   * @param capture Whether to capture the current state.
   */
  select(indexes: number[], capture = true): void {
    for (const i of indexes) {
      this.array[i].selected = true;
    }
    if (capture) {
      this.captureState();
    }
  }

  /**
   * Unselects all the nodes at the given indexes in the array.
   * @param indexes The indexes of the nodes to be unselected.
   * @param capture Whether to capture the current state.
   */
  unselect(indexes: number[], capture = true): void {
    for (const i of indexes) {
      this.array[i].selected = false;
    }
    if (capture) {
      this.captureState();
    }
  }

  /**
   * Updates the value of the node at the given index.
   * @param i The index of the node to be changed.
   * @param value The new value the node should be updated to.
   * @param capture Whether to capture the current state.
   */
  update(i: number, value: number, capture = true): void {
    this.array[i].value = value;
    this.array[i].changed = true;
    if (capture) {
      this.captureState();
    }
    this.array[i].changed = false;
  }

  /**
   * Swaps the values of the nodes at the given indexes.
   * @param i The index of the first node.
   * @param j The index of the second node.
   * @param capture Whether to capture the current state.
   */
  swap(i: number, j: number, capture = true): void {
    [this.array[i], this.array[j]] = [this.array[j], this.array[i]];
    this.array[i].changed = true;
    this.array[j].changed = true;
    if (capture) {
      this.captureState();
    }
    this.array[i].changed = false;
    this.array[j].changed = false;
  }
}
