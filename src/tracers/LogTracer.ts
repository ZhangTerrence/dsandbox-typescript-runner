import Tracer from "./Tracer";
import { type LogTracerStates, Renderers } from "../types";

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
    return;
  }

  /**
   * Adds message to the tracer's states.
   * @param message The message.
   */
  print(message: string): void {
    this.states.push(message);
  }
}
