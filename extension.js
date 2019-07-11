const vscode = require('vscode');
const chokidar = require('chokidar');
const path = require('path');

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
					placeHolder: 'Enter your project name here...',
				}).then(projectName => {

					if (!projectName) {
						return;
					}

					const projectFolder = folder[0].fsPath;
					const projectPath = path.join(projectFolder, projectName);
					const terminal = vscode.window.createTerminal();
					
					terminal.show();
					terminal.sendText(`twilio serverless:init ${projectName}`);

					// Watch directory for the creation of the project.
					const fileWatcher = chokidar.watch(projectFolder, {
						ignored: /(^|[\/\\])\../,
						persistent: true,
						depth: 1
					});

					fileWatcher
						.on('addDir', path => {
							if (path === projectPath) {
								// Open project once the folder has been created
								vscode.commands.executeCommand('vscode.openFolder', vscode.Uri.file(projectPath));
							}
						})

				})				
			});
	});

	let newFn = vscode.commands.registerCommand('extension.new', function () {
		return vscode.window.showInputBox({
			ignoreFocusOut: true,
			placeHolder: 'Enter your function name here...',
		}).then(fnName => {
			const wsPath = (vscode.workspace.workspaceFolders[0].uri.fsPath);
			const fnPath = path.join(wsPath, 'functions');
			
			if (!fnName || !wsPath) {
				return;
			}

			const terminal = vscode.window.createTerminal();
			terminal.show();
			terminal.sendText(`twilio serverless:new ${fnName}`);

			const fileWatcher = chokidar.watch(fnPath, {
				ignored: /(^|[\/\\])\../,
				persistent: true,
				depth: 1
			});

			fileWatcher
				.on('add', path => {
					if (path === wsPath + `/functions/${fnName}.js`) {
						// Open file once created
						vscode.window.showTextDocument(vscode.Uri.file(wsPath + `/functions/${fnName}.js`));
					}
				})

		})
	});

	let start = vscode.commands.registerCommand('extension.start', function () {
		
		const terminal = vscode.window.createTerminal();
		terminal.show();
		terminal.sendText(`twilio serverless:start --live`);

	});

	let deploy = vscode.commands.registerCommand('extension.deploy', function () {

		const terminal = vscode.window.createTerminal();
		terminal.show();
		terminal.sendText(`twilio serverless:deploy`);

	});

	context.subscriptions.push(init, newFn, start, deploy);
}
exports.activate = activate;

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
