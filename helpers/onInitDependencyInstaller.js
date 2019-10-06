import * as child_process from 'child_process';

export function installDependencies(context, output) {
  output.appendLine('`twilio-cli` will be installed automatically!');
  output.appendLine('Running... `npm install twilio-cli -g`');
  output.appendLine(
    `If the package installation fails, you can manually install.`,
  );
  output.appendLine(
    'To manually install you can run the following: `npm install twilio-cli -g && twilio plugins:install @twilio-labs/plugin-serverless`',
  );

  const cliCheck = child_process.execFileSync(
    'npm',
    ['ls', '-g', 'twilio-cli', '--json'],
    {
      encoding: 'utf8',
    },
  );
  const cliCheckNpmJSON = JSON.parse(cliCheck);
  // npm with --json flag yields `{}` if the package is uninstalled.
  if (isTruthy(cliCheckNpmJSON)) {
    return;
  }

  child_process.execFileSync('npm', ['install', '-g', 'twilio-cli'], {
    encoding: 'utf8',
  });
  child_process.execFileSync(
    'twilio',
    ['plugins:install', '@twilio-labs/plugin-serverless'],
    {
      encoding: 'utf8',
    },
  );
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
