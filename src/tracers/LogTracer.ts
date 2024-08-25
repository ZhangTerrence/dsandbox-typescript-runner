import Tracer from "./Tracer";
import { type States } from "../types";
import { Renderers } from "../constants.ts";

export default class LogTracer extends Tracer {
  states: States;

  constructor(title: string, renderer = Renderers.LogRenderer) {
    super(title, renderer);
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
