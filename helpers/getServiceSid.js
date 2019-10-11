// check if service sid exists in twilio functions

// if not, prompt for service sid from vscode

const fs = require("fs");
const path = require("path");

const getServiceSid = vscode => {
  return new Promise((resolve, reject) => {
    if (vscode.workspace.workspaceFolders.length > 0) {
      const wsPath = vscode.workspace.workspaceFolders[0].uri.fsPath;
      const twilioFnFilePath = path.join(wsPath, `.twilio-functions`);
      fs.readFile(twilioFnFilePath, (err, data) => {
        let parsedData = {};
        if (data) {
          parsedData = JSON.parse(data.toString());
        }
        if (err || !parsedData.serviceSid) {
          vscode.window
            .showInputBox({
              ignoreFocusOut: true,
              placeHolder: "Enter your Service SID here..."
            })
            .then(serviceSid => {
              parsedData.serviceSid = serviceSid;
              const writeData = JSON.stringify(parsedData, null, 4);

              fs.writeFile(twilioFnFilePath, writeData, "utf-8", error => {
                if (error) {
                  reject(error);
                }

                resolve(serviceSid);
              });
            });
        } else {
          resolve(parsedData.serviceSid);
        }
      });
    } else {
      reject(
        new Error("No workspace folder detected. Please init a new project.")
      );
    }
  });
};

module.exports = getServiceSid;
