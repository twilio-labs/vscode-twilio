const vscode = require("vscode");
const fs = require("fs");
const path = require('path');
const assignTerminal = require("../helpers/assignTerminal");
const { TwilioClientCommand } = require("@twilio/cli-core").baseCommands;

const { handler, cliInfo, describe } = require("twilio-run/dist/commands/list");

function list(type = 'functions') {
  const terminal = assignTerminal(vscode, "list");
  terminal.show();
  terminal.sendText(`twilio serverless:list`);
  const wsPath = vscode.workspace.workspaceFolders[0].uri.fsPath;
}

module.exports = list;
