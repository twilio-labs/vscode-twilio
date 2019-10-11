const assignTerminal = (vscode, command) => {
  let terminal;

  const terminals = vscode.window.terminals;
  const serverTerminals = terminals.filter(t => {
    return t.name === "server";
  });

  const otherTerminals = terminals.filter(t => {
    return t.name !== "server";
  });

  if (command === "start") {
    terminal =
      serverTerminals.length < 1
        ? vscode.window.createTerminal("server")
        : serverTerminals[0];
  } else {
    terminal =
      otherTerminals.length < 1
        ? vscode.window.createTerminal()
        : otherTerminals[0];
  }

  return terminal;
};

module.exports = assignTerminal;
