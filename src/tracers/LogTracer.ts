import Tracer from "./Tracer";
import { Renderers, type States } from "../types";

export default class LogTracer extends Tracer {
  readonly states: States;

  constructor(title: string) {
    super(title, Renderers.LogRenderer);
    this.states = [];
  }

  override captureState(): void {
    return;
  }

  override nop(): void {
    return;
  }

  /**
   * Adds message to the tracer's states.
   * @param message The message.
   */
  print(message: string): void {
    this.states.push({
      data: message,
      metadata: {},
    });
  }
}
