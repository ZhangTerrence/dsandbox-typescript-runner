import Tracer from "./tracers/Tracer";
import { type Schedule } from "./types";

export default class Scheduler {
  private readonly tracers: Tracer[];

  constructor(...tracers: Tracer[]) {
    this.tracers = tracers;
  }

  run(): void {
    const schedules: Schedule[] = [];

    for (const tracer of this.tracers) {
      schedules.push({
        title: tracer.title,
        renderer: tracer.renderer,
        states: tracer.states.map((state) => JSON.stringify(state)),
      });
    }

    console.log(JSON.stringify(schedules, null, 2));
  }
}
