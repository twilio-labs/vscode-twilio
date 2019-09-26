const vscode = require('vscode');
const assignTerminal = require('../helpers/assignTerminal');

function deploy() {
    const terminal = assignTerminal(vscode, 'deploy')
    terminal.show();
    terminal.sendText(`twilio serverless:deploy`);
}

module.exports = deploy;
