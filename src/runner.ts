import Snippet from "./snippet";
import { type Output } from "./utilities.ts";

(function main() {
  const snippet = new Snippet();

  const output: Output[] = [];
  for (const tracer of snippet.tracers.getTracers()) {
    output.push({
      title: tracer.getTitle(),
      renderer: tracer.getRenderer(),
      states: JSON.stringify(tracer.getStates())
    });
  }
  const outputString = JSON.stringify(output, null, 2);

  process.stdout.write(outputString);
})();