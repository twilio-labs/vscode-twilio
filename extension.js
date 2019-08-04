const vscode = require('vscode');
const chokidar = require('chokidar');
const path = require('path');
const assignTerminal = require('./helpers/assignTerminal');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	console.log('Twilio Serverless for Code is now active!');

	let init = vscode.commands.registerCommand('extension.init', function () {
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
				})				
			});
	});

	let newFn = vscode.commands.registerCommand('extension.new', function () {
		return vscode.window.showInputBox({
			ignoreFocusOut: true,
			placeHolder: 'Enter your function name here...',
		}).then(fnName => {
			const wsPath = (vscode.workspace.workspaceFolders[0].uri.fsPath);
			const fnDirPath = path.join(wsPath, 'functions');
			const fnFilePath = path.join(fnDirPath, `${fnName}.js`);
			
			if (!fnName || !wsPath) {
				return;
			}

			const terminal = assignTerminal(vscode, 'new');
			terminal.show();
			terminal.sendText(`twilio serverless:new ${fnName}`);

			const fileWatcher = chokidar.watch(fnDirPath, {
				ignored: /(^|[\/\\])\../,
				persistent: true,
				depth: 1
			});

			fileWatcher.on('add', addedFile => {
				if (addedFile === fnFilePath) {
					// Open file once created
					vscode.workspace.openTextDocument(vscode.Uri.parse(fnFilePath)).then(doc => {
						vscode.window.showTextDocument(doc, 1, false);
					});
				}
			});
		});
	});

	let start = vscode.commands.registerCommand('extension.start', function () {

		const serverTerminal = assignTerminal(vscode, 'start');

		serverTerminal.show();
		serverTerminal.sendText(`twilio serverless:start --live`);
	});

	let deploy = vscode.commands.registerCommand('extension.deploy', function () {

		const terminal = assignTerminal(vscode, 'deploy')
	
		terminal.show();
		terminal.sendText(`twilio serverless:deploy`);
	});

	context.subscriptions.push(init, newFn, start, deploy);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
