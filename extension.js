const installDependencies = require("./helpers/onInitDependencyInstaller");

const vscode = require("vscode");
const {
  activateFn,
  createEnv,
  deploy,
  init,
  newFunction,
  start,
  list
} = require("./commands");

/**
 * @param {vscode.ExtensionContext} context
 */

const output = vscode.window.createOutputChannel("twilio");

const activate = context => {
  console.log("Twilio Serverless for Code is now active!");

  installDependencies(context, output);

  const createProject = vscode.commands.registerCommand("extension.init", init);
  const createFunction = vscode.commands.registerCommand(
    "extension.new",
    newFunction
  );
  const startServer = vscode.commands.registerCommand("extension.start", start);
  const deployFunction = vscode.commands.registerCommand(
    "extension.deploy",
    deploy
  );
  const activateFunction = vscode.commands.registerCommand(
    "extension.activate",
    activateFn
  );
  const createEnvironment = vscode.commands.registerCommand(
    "extension.createEnvironment",
    createEnv
  );
  const listFunctions = vscode.commands.registerCommand(
    "extension.listFunctions",
    list
  );
  const listServices = vscode.commands.registerCommand(
    "extension.listServices",
    () => {
      list("services");
    }
  );
  const listEnvironments = vscode.commands.registerCommand(
    "extension.listEnvironments",
    () => {
      list("environments");
    }
  );
  const listAssets = vscode.commands.registerCommand(
    "extension.listAssets",
    () => {
      list("assets");
    }
  );
  const listVariables = vscode.commands.registerCommand(
    "extension.listVariables",
    () => {
      list("variables");
    }
  );

  context.subscriptions.push(
    activateFunction,
    createEnvironment,
    createFunction,
    createProject,
    deployFunction,
    startServer,
    listFunctions,
    listServices,
    listEnvironments,
    listAssets,
    listVariables
  );
};

const deactivate = () => {
  /* nothing to do for now */
};

module.exports = {
  activate,
  deactivate
};
