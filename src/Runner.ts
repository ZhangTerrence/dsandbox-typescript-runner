import Tracer from "./tracers/Tracer.ts";

export const enum Renderers {
  Array1DRenderer = "Array1DRenderer",
  ChartRenderer = "ChartRenderer",
  LogRenderer = "LogRenderer",
}

export type Array1DState = number[];
export type LogState = string;

export type States = {
  data: Array1DState | LogState;
  metadata: Record<string, unknown>;
}[];

export type Output = {
  title: string;
  renderer: Renderers;
  states: string;
};

export default class Runner {
  private readonly tracers: Tracer[];

  constructor(...tracers: Tracer[]) {
    this.tracers = tracers;
  }

  runSnippets(): void {
    const output: Output[] = [];

    for (const tracer of this.tracers) {
      output.push({
        title: tracer.title,
        renderer: tracer.renderer,
        states: JSON.stringify(tracer.states)
      });
    }

    console.log(JSON.stringify(output, null, 2));
  }
}
