import { Renderers } from "./constants.ts";

export type Array1DState = number[];
export type LogState = string;

export type State = {
  data: Array1DState | LogState;
  metadata: Record<string, unknown>;
};
export type States = State[];

export type Schedule = {
  title: string;
  renderer: Renderers;
  states: string[];
};
