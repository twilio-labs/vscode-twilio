const vscode = require('vscode');
const {
	activateFn,
	createEnv,
	deploy,
	init,
	newFunction,
	start,
	list
} = require('./commands');

/**
 * @param {vscode.ExtensionContext} context
 */

function activate(context) {

	console.log('Twilio Serverless for Code is now active!');

	const createProject = vscode.commands.registerCommand('extension.init', init);
	const createFunction = vscode.commands.registerCommand('extension.new', newFunction);
	const startServer = vscode.commands.registerCommand('extension.start', start);
	const deployFunction = vscode.commands.registerCommand('extension.deploy', deploy);
 	const activateFunction = vscode.commands.registerCommand('extension.activate', activateFn);
	const createEnvironment = vscode.commands.registerCommand('extension.createEnvironment', createEnv);
	const listFunctions = vscode.commands.registerCommand('extension.listFunctions', list);

	context.subscriptions.push(
		activateFunction,
		createEnvironment,
		createFunction,
		createProject,
		deployFunction,
		startServer,
		listFunctions
	);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
