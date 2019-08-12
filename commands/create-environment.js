const vscode = require('vscode');
const assignTerminal = require('../helpers/assignTerminal');
const getServiceSid = require('../helpers/getServiceSid');

function createEnv() {
    const terminal = assignTerminal(vscode, 'activate');

    getServiceSid(vscode).then((serviceSid) => {
        vscode.window.showInputBox({
            ignoreFocusOut: true,
            placeHolder: "Enter your environment unique name (e.g. 'production')...",
        }).then(uniqueName => {
            vscode.window.showInputBox({
                ignoreFocusOut: true,
                placeHolder: "Enter your environment suffix (e.g. 'prod' for my-project-1234-prod.twil.io)..."
            }).then(suffix => {
                terminal.show();
                terminal.sendText(
                    `twilio api:serverless:v1:services:environments:create \
                        --service-sid=${serviceSid} \
                        --domain-suffix=${suffix} \
                        --unique-name=${uniqueName}`
                );
            });
        });

    });
}

module.exports = createEnv;
