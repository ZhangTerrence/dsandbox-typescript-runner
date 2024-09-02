import { Renderer, type Renderer as RendererType, type States } from "../utilities.ts";

export default abstract class Tracer {
  protected readonly title: string;
  protected renderer: RendererType;
  protected states: States;

  protected constructor(title: string) {
    this.title = title;
    this.renderer = Renderer.Base;
    this.states = [];
  }

  getTitle(): string {
    return this.title;
  }

  getRenderer(): RendererType {
    return this.renderer;
  }

  getStates(): States {
    return this.states;
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
