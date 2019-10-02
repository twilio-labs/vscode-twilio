const vscode = require("vscode");
const fs = require("fs");
const path = require('path');
const assignTerminal = require("../helpers/assignTerminal");

function list(type = 'functions') {
  const terminal = assignTerminal(vscode, "list");
  terminal.show();
  terminal.sendText(`twilio serverless:list`);
  const wsPath = vscode.workspace.workspaceFolders[0].uri.fsPath;
}

module.exports = list;
