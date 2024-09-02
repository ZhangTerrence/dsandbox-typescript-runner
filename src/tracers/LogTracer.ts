import Tracer from "./Tracer";
import { Renderer } from "../utilities.ts";

export default class LogTracer extends Tracer {
  constructor(title: string) {
    super(title);
    this.renderer = Renderer.LogRenderer;
  }

  /**
   * Captures the current state of the tracer.
   *
   * NOTE: This method does nothing in LogTracer.
   * @param _ Additional data to attach to current state.
   */
  override captureState(_: Record<string, unknown>): void {
    return;
  }

  /**
   * Adds a nop state to the tracer.
   *
   * NOTE: This method does nothing in LogTracer.
   */
  override nop(): void {
    return;
  }

  /**
   * Adds a log to be printed later.
   * @param message The message.
   */
  print(message: string): void {
    this.states.push({
      data: message,
      metadata: {},
    });
  }
}
