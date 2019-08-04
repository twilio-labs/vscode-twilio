function assignTerminal(vscode, command) {

    let terminal;

    const terminals = vscode.window.terminals;
    const serverTerminals = terminals.filter((terminal) => {
        return terminal.name === 'server';
    });

    const otherTerminals = terminals.filter((terminal) => {
        return terminal.name !== 'server';
    })

    if (command === 'start') {
        terminal = serverTerminals.length < 1 ? vscode.window.createTerminal("server") : serverTerminals[0];
    } else {
        terminal = otherTerminals.length < 1 ? vscode.window.createTerminal() : otherTerminals[0];
    }

    return terminal;
}

module.exports = assignTerminal;