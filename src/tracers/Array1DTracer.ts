import Tracer from "./Tracer";
import { Renderer } from "../utilities.ts";

type ArrayNode = {
  value: number;
  selected: boolean;
  updated: boolean;
}[];

export default class Array1DTracer extends Tracer {
  private array: ArrayNode;

  constructor(title: string) {
    super(title);
    this.renderer = Renderer.Array1DRenderer;
    this.array = [];
  }

  /**
   * Captures the current state of the tracer and clears any selected and updated tags.
   * @param metadata Additional data to attach to current state.
   */
  override captureState(metadata: Record<string, unknown> = {}): void {
    const selected: number[] = []
    const updated: number[] = []
    this.array.forEach((e, i) => {
      if (e.selected) {
        this.array[i].selected = false;
        selected.push(i);
      }
      if (e.updated) {
        this.array[i].updated = false;
        updated.push(i);
      }
    })
    this.states.push({
      data: structuredClone(this.array.map(e => e.value)),
      metadata: {
        selected: selected,
        updated: updated,
        ...metadata
      },
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
    this.array = structuredClone(array).map(e => {
      return {
        value: e,
        selected: false,
        updated: false,
      }
    });
  }

  /**
   * Selects all the elements at the given indexes in the array. Sets selected tags.
   * @param indexes The indexes of the elements to be selected.
   * @param metadata Additional data to attach to current state.
   * @param [capture=true] Whether to capture after action.
   */
  select(indexes: number[], metadata: Record<string, unknown> = {}, capture = true): void {
    for (const i of indexes) {
      this.array[i].selected = true;
    }
    if (capture) {
      const selected: number[] = [];
      this.array.forEach((e, i) => {
        if (e.selected) {
          selected.push(i);
        }
      } );
      this.captureState({
        selected: selected,
        ...metadata,
      });
    }
  }

  /**
   * Updates the value of the element at the given index. Sets updated tags.
   * @param i The index of the element to be changed.
   * @param value The new value the element should be updated to.
   * @param metadata Additional data to attach to current state.
   * @param [capture=true] Whether to capture after action.
   */
  update(i: number, value: number, metadata: Record<string, unknown> = {}, capture = true): void {
    this.array[i].value = value;
    this.array[i].updated = true;
    if (capture) {
      const updated: number[] = [];
      this.array.forEach((e, i) => {
        if (e.updated) {
          updated.push(i);
        }
      } );
      this.captureState({
        updated: updated,
        ...metadata,
      });
    }
  }

  /**
   * Swaps the values of the elements at the given indexes. Sets updated tags.
   * @param i The index of the first element.
   * @param j The index of the second element.
   * @param metadata Additional data to attach to current state.
   * @param [capture=true] Whether to capture after action.
   */
  swap(i: number, j: number, metadata: Record<string, unknown> = {}, capture = true): void {
    [this.array[i], this.array[j]] = [this.array[j], this.array[i]];
    this.array[i].updated = true;
    this.array[j].updated = true;
    if (capture) {
      const updated: number[] = [];
      this.array.forEach((e, i) => {
        if (e.updated) {
          updated.push(i);
        }
      } );
      this.captureState({
        updated: updated,
        ...metadata,
      });
    }
  }
}
