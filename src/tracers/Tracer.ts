import { Renderers } from "../types";
import { type TracerStates } from "../types";

export default abstract class Tracer {
  readonly title: string;
  readonly renderer: Renderers;
  readonly states: TracerStates;

  protected constructor(title: string, renderer: Renderers) {
    this.title = title;
    this.renderer = renderer;
    this.states = [];
  }

  /**
   * Captures the current state of the tracer.
   */
  abstract captureState(): void;

  /**
   * Adds a nop state to the tracer.
   */
  abstract nop(): void;
}
