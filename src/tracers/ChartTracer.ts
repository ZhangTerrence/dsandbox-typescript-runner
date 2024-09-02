import Array1DTracer from "./Array1DTracer.ts";
import { Renderer } from "../utilities.ts";

export default class ChartTracer extends Array1DTracer {
  constructor(title: string) {
    super(title);
    this.renderer = Renderer.ChartRenderer;
  }

  /**
   * Copies the states of an existing 1D array tracer over to the chart tracer.
   * @param array1DTracer The 1D array tracer whose states will be copied from.
   */
  fromArray1DTracer(array1DTracer: Array1DTracer): void {
    this.states = array1DTracer.getStates();
  }
}
