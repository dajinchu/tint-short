const yaml = require("js-yaml");
const fs = require("fs");
const { Command, flags } = require("@oclif/command");
const transpile = require("./transpile");

class TintShortCommand extends Command {
  async run() {
    const {
      args: { inFile, outFile },
    } = this.parse(TintShortCommand);
    const input = fs.readFileSync(inFile, "utf-8");
    const shortMachine = yaml.safeLoad(input);
    const transpiled = transpile(shortMachine);
    const out = yaml.safeDump(transpiled, { flowLevel: 2 });
    fs.writeFileSync(outFile, out);
  }
}

TintShortCommand.description = `Describe the command here
...
Extra documentation goes here
`;

TintShortCommand.flags = {
  // add --version flag to show CLI version
  version: flags.version({ char: "v" }),
  // add --help flag to show CLI version
  help: flags.help({ char: "h" }),
};

TintShortCommand.args = [
  {
    name: "inFile",
    description: "path of tint-short machine file to transpile",
    required: true,
  },
  {
    name: "outFile",
    description: "path to output transpiled tint program",
    required: true,
  },
];

module.exports = TintShortCommand;
