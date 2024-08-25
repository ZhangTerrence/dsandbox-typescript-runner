import Tracer from "./Tracer";
import { Renderers, type Array1DState, type States } from "../types";

export default class Array1DTracer extends Tracer {
  private array: Array1DState;
  readonly states: States;

  constructor(title: string) {
    super(title, Renderers.Array1DRenderer);
    this.array = [];
    this.states = [];
  }

  override captureState(metadata: Record<string, unknown> = {}): void {
    this.states.push({
      data: structuredClone(this.array),
      metadata: metadata,
    });
  }

  override nop(): void {
    this.captureState();
  }

  /**
   * Sets the internal array.
   * @param array The array to be traced.
   */
  setArray(array: number[]): void {
    this.array = array;
  }

  /**
   * Selects all the nodes at the given indexes in the array.
   * @param indexes The indexes of the nodes to be selected.
   * @param metadata Additional data to attach to current state.
   */
  select(indexes: number[], metadata: Record<string, unknown> = {}): void {
    this.captureState({
      selected: indexes,
      ...metadata,
    });
  }

  /**
   * Updates the value of the node at the given index.
   * @param i The index of the node to be changed.
   * @param value The new value the node should be updated to.
   * @param metadata Additional data to attach to current state.
   */
  update(i: number, value: number, metadata: Record<string, unknown> = {}): void {
    this.array[i] = value;
    this.captureState({
      updated: [i],
      ...metadata,
    });
  }

  /**
   * Swaps the values of the nodes at the given indexes.
   * @param i The index of the first node.
   * @param j The index of the second node.
   * @param metadata Additional data to attach to current state.
   */
  swap(i: number, j: number, metadata: Record<string, unknown> = {}): void {
    [this.array[i], this.array[j]] = [this.array[j], this.array[i]];
    this.captureState({
      updated: [i, j],
      ...metadata,
    });
  }
}
