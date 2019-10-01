const vscode = require("vscode");
const fs = require("fs");
const path = require('path');
const assignTerminal = require("../helpers/assignTerminal");

function list() {
  const terminal = assignTerminal(vscode, "list");
  terminal.show();
  terminal.sendText(`twilio serverless:list`);
  const wsPath = vscode.workspace.workspaceFolders[0].uri.fsPath;
  const fnDirPath = path.join(wsPath, "functions");
  fs.readdir(fnDirPath, (err, files) => {
    files.forEach(file => {
      console.log(file);
    });
  });
}

module.exports = list;
