import { LogTracerStates, Renderers } from "../types";
import Tracer from "./Tracer";

export default class LogTracer extends Tracer {
  readonly states: LogTracerStates;

  constructor(title: string) {
    super(title, Renderers.LogRenderer);
    this.states = [];
  }

  override captureState(): void {
    return;
  }

  override nop(): void {
    this.states.push(null);
  }

  /**
   * Adds message to the tracer's states.
   * @param message The message.
   */
  print(message: string): void {
    this.states.push(message);
  }
}
