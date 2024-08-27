import Array1DTracer from "./Array1DTracer.ts";
import { Renderers } from "../Runner.ts";

export default class ChartTracer extends Array1DTracer {
  constructor(title: string, renderer = Renderers.ChartRenderer) {
    super(title, renderer);
  }

  /**
   * Constructs the chart tracer from an existing 1D array tracer.
   * @param array1DTracer The 1d array tracer whose states are to be copied from.
   */
  fromArray1DTracer(array1DTracer: Array1DTracer): void {
    this.states = array1DTracer.states;
  }
}
