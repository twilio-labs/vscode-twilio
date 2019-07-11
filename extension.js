
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const { exec } = require('child_process');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	console.log('Congratulations, your extension "twilioserverless" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.serverless', function () {
		return vscode.window
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
					placeHolder: 'Enter your project name here...',
				}).then(projectName => {

					if (!projectName) {
						return;
					}

					const projectFolder = folder[0].fsPath;
					
					const terminal = vscode.window.createTerminal();
					terminal.show();
					terminal.sendText(`twilio serverless:init ${projectName}`);

					vscode.commands.executeCommand('vscode.openFolder', vscode.Uri.file(projectFolder));
				})				
			});
	});

	context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
