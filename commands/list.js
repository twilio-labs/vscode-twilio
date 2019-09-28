const vscode = require('vscode');
const assignTerminal = require('../helpers/assignTerminal');

function list() {
    const terminal = assignTerminal(vscode, 'list')
    terminal.show();
    terminal.sendText(`twilio serverless:list`);
}

module.exports = list;
