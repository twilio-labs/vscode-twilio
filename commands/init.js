const vscode = require('vscode');
const assignTerminal = require('../helpers/assignTerminal');

function init() {
    vscode.window
        .showOpenDialog({
            canSelectFiles: false,
            canSelectFolders: true,
            canSelectMany: false,
            openLabel: `Create Project`,
        })
        .then(folder => {
            if (!folder) {
                return;
            }
            vscode.window.showInputBox({
                ignoreFocusOut: true,
                placeHolder: 'Enter your project name...',
            }).then(projectName => {

                if (!projectName) {
                    return;
                }

                const projectFolder = folder[0].fsPath;

                console.log(projectFolder);

                const terminal = assignTerminal(vscode, 'init');
                terminal.show();
                terminal.sendText(`cd ${projectFolder}`);
                terminal.sendText(`twilio serverless:init ${projectName} && code ${projectName} -r`);
            });
        });
}

module.exports = init;
