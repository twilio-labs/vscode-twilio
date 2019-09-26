const vscode = require('vscode');
const assignTerminal = require('../helpers/assignTerminal');
const getServiceSid = require('../helpers/getServiceSid');

function activateFn() {
    const terminal = assignTerminal(vscode, 'activate')

    getServiceSid(vscode).then((serviceSid) => {
        vscode.window.showInputBox({
            ignoreFocusOut: true,
            placeHolder: "Enter the environment you want to deploy from (e.g. 'dev')...",
        }).then(source => {
            vscode.window.showInputBox({
                ignoreFocusOut: true,
                placeHolder: "Enter the environment you want to deploy to (e.g. 'prod')..."
            }).then(destination => {
                terminal.show();
                terminal.sendText(
                    `twilio serverless:activate --service-sid=${serviceSid} \
                        --environment=${destination} \
                        --source-environment=${source}`
                );
            });
        });
    });
}

module.exports = activateFn;
