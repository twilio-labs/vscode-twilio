const vscode = require("vscode");
const assignTerminal = require("../helpers/assignTerminal");
const getServiceSid = require('../helpers/getServiceSid');

function list(type = 'functions') {
  const terminal = assignTerminal(vscode, "list");
  getServiceSid(vscode).then((serviceSid) => {
    terminal.show();
    terminal.sendText(`twilio serverless:list ${type} --service-sid=${serviceSid}`);
  }).catch(err => {
    terminal.show();
    terminal.sendText(err);
  });
}

module.exports = list;
