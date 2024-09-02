import Tracer from "./Tracer";
import { Renderer, type Array1DState } from "../utilities.ts";

export default class Array1DTracer extends Tracer {
  private array: Array1DState;

  constructor(title: string) {
    super(title);
    this.renderer = Renderer.Array1DRenderer;
    this.array = [];
  }

  /**
   * Captures the current state of the tracer.
   * @param metadata Additional data to attach to current state.
   */
  override captureState(metadata: Record<string, unknown> = {}): void {
    this.states.push({
      data: structuredClone(this.array),
      metadata: metadata,
    });
  }

  /**
   * Adds a nop state to the tracer.
   */
  override nop(): void {
    this.captureState();
  }

  /**
   * Sets the internal array.
   * @param array The array to be traced.
   */
  setArray(array: number[]): void {
    this.array = structuredClone(array);
  }

  /**
   * Selects all the elements at the given indexes in the array.
   * @param indexes The indexes of the elements to be selected.
   * @param metadata Additional data to attach to current state.
   */
  select(indexes: number[], metadata: Record<string, unknown> = {}): void {
    this.captureState({
      selected: indexes,
      ...metadata,
    });
  }

  /**
   * Updates the value of the element at the given index.
   * @param i The index of the element to be changed.
   * @param value The new value the element should be updated to.
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
   * Swaps the values of the elements at the given indexes.
   * @param i The index of the first element.
   * @param j The index of the second element.
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
