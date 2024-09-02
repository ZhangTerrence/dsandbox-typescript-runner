import Tracer from "./tracers/Tracer.ts";
import ChartTracer from "./tracers/ChartTracer.ts";
import Array1DTracer from "./tracers/Array1DTracer.ts";
import LogTracer from "./tracers/LogTracer.ts";

export const Renderer = Object.freeze({
  Base: "Base",
  Array1DRenderer: "Array1DRenderer",
  ChartRenderer: "ChartRenderer",
  LogRenderer: "LogRenderer"
});
export type Renderer = typeof Renderer[keyof typeof Renderer];

export type Array1DState = number[];
export type LogState = string;

export type States = {
  data: Array1DState | LogState;
  metadata: Record<string, unknown>;
}[];

export type Output = {
  title: string;
  renderer: Renderer;
  states: string;
};

export class Tracers {
  private readonly tracers: Record<string, Tracer>

  constructor() {
    this.tracers = Object.create(null);
  }

  get(title: string): Tracer {
    return this.tracers[title];
  }

  getTracers(): Tracer[] {
    return Object.values(this.tracers);
  }

  addArray1DTracer(title: string): void {
    this.tracers[title] = new Array1DTracer(title);
  }

  addChartTracer(title: string): void {
    this.tracers[title] = new ChartTracer(title);
  }

  addLogTracer(title: string): void {
    this.tracers[title] = new LogTracer(title);
  }
}