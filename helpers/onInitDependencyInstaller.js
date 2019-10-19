const { execFileSync } = require('child_process');

function installDependencies(context, output) {
  if (process.platform === 'darwin') {
    try {
      // Check if already installed via Brew on darwin.
      execFileSync('twilio', {
        encoding: 'utf8',
      });
      return;
    } catch (e) {
      // Not detected. Proceed will installation as normal.
    }
  }

  const cliCheck = execFileSync(
    'npm',
    ['ls', '-g', 'twilio-cli', '--json'],
    {
      encoding: 'utf8',
    }
  );
  const cliCheckNpmJSON = JSON.parse(cliCheck);
  // npm with --json flag yields `{}` if the package is uninstalled.
  if (isTruthy(cliCheckNpmJSON)) {
    return;
  }

  output.show();
  output.appendLine('`twilio-cli` is being automatically installed!');
  output.appendLine('Running... `npm install twilio-cli -g`');
  output.appendLine(
    `If the package installation fails, you can manually install.`
  );

  switch (process.platform) {
    case 'darwin':
      output.appendLine(
        'To manually install `twilio-cli` via Homebrew please do: `brew install twilio/brew/twilio && twilio plugins:install @twilio-labs/plugin-serverless`.'
      );
      break;
    default:
      break;
  }
  output.appendLine(
    'To manually install via npm you can run the following: `npm install twilio-cli -g && twilio plugins:install @twilio-labs/plugin-serverless`'
  );

  try {
    execFileSync('npm', ['install', '-g', 'twilio-cli'], {
      encoding: 'utf8',
    });
    execFileSync(
      'twilio',
      ['plugins:install', '@twilio-labs/plugin-serverless'],
      {
        encoding: 'utf8',
      }
    );
  } catch (e) {
    output.appendLine(
      'ERROR. Could not automatically install `twilio`. Please install manually.'
    );
  }
}

/**
 * Checks if the value is truthy. Checks against the following
 * values: `false`, `0`, `""`, `null`, `undefined`, `NaN`, `[]`,
 * and `{}`.
 *
 * @param o The object to check.
 * @see https://developer.mozilla.org/en-US/docs/Glossary/Truthy
 */
function isTruthy(o) {
  if (!!o && o.constructor === Object) {
    return !!Object.keys(o).length;
  }
  if (Array.isArray(o)) {
    return !!o.length;
  }
  return !!o;
}

module.exports = installDependencies;
