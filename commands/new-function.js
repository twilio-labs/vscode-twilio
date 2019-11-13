const path = require("path");
const vscode = require("vscode");
const chokidar = require("chokidar");
const assignTerminal = require("../helpers/assignTerminal");

const newFunction = () => {
  return vscode.window
    .showInputBox({
      ignoreFocusOut: true,
      placeHolder: "Enter your function name here..."
    })
    .then(fnName => {
      const wsPath = vscode.workspace.workspaceFolders[0].uri.fsPath;
      const fnDirPath = path.join(wsPath, "functions");
      const fnFilePath = path.join(fnDirPath, `${fnName}.js`);

      if (!fnName || !wsPath) {
        return;
      }

      const terminal = assignTerminal(vscode, "new");
      terminal.show();
      terminal.sendText(`twilio serverless:new ${fnName}`);

      const fileWatcher = chokidar.watch(fnDirPath, {
        ignored: /(^|[\/\\])\../,
        persistent: true,
        depth: 1
      });

      fileWatcher.on("add", addedFile => {
        if (addedFile === fnFilePath) {
          // Open file once created
          vscode.workspace
            .openTextDocument(vscode.Uri.parse(fnFilePath))
            .then(doc => {
              vscode.window.showTextDocument(doc, 1, false);
            });
        }
      });
    });
};

module.exports = newFunction;
