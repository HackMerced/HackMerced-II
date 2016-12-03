const args = process.argv.slice(2);

require("./environment.js").manager.generateEnvironment(args);
