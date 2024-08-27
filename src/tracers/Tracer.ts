import { Renderers, type States } from "../Runner.ts";

export default abstract class Tracer {
  readonly title: string;
  readonly renderer: Renderers;
  readonly states: States;

  protected constructor(title: string, renderer: Renderers) {
    this.title = title;
    this.renderer = renderer;
    this.states = [];
  }

  /**
   * Captures the current state of the tracer.
   * @param metadata Additional data to attach to current state.
   */
  abstract captureState(metadata: Record<string, unknown>): void;

  /**
   * Adds a nop state to the tracer.
   */
  abstract nop(): void;
}
