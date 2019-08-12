const vscode = require('vscode');
const assignTerminal = require('../helpers/assignTerminal');

function start() {
    const serverTerminal = assignTerminal(vscode, 'start');
    serverTerminal.show();
    serverTerminal.sendText(`twilio serverless:start --live`);
}

module.exports = start;
