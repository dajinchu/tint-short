const yaml = require("js-yaml");
const _ = require("lodash");
const fs = require("fs");

const input = fs.readFileSync(0, "utf-8");

const machine = yaml.safeLoad(input);

const tapeAlphabet = _(machine.transitions)
  .values()
  .map(Object.keys)
  .flatten()
  .uniq()
  .sort()
  .value();

// arrow to use when rejection
const REJECT_ARROW_LABEL = [machine.reject, "_", "R"];
// arrow to use when accept
const ACCEPT_ARROW_LABEL = [machine.accept, "_", "R"];

const transitions = _(machine.transitions)
  .mapValues((arrowLabels) =>
    tapeAlphabet.map((letter) => {
      // fill in rejection arrows when letter is not present
      if (letter in arrowLabels) {
        const arrow = arrowLabels[letter];
        if (arrow === "accept") {
          return [letter, ...ACCEPT_ARROW_LABEL];
        } else if (arrow.length === 3) {
          return [letter, ...arrow];
        } else if (arrow.length === 2) {
          // length 2 is shorthand for non-write transition
          return [letter, arrow[0], letter, arrow[1]];
        } else {
          console.error("bad transition ", arrow);
          process.exit(1);
        }
      } else {
        return [letter, ...REJECT_ARROW_LABEL];
      }
    })
  )
  .toPairs()
  .map(([state, arrows]) => arrows.map((a) => [state, ...a]))
  .flatten();

machine.transitions = transitions.value();
console.log(yaml.safeDump(machine, { flowLevel: 2 }));
