const spawn = require('child_process').spawn;

// List all the commands that should be ran as part of releasing. Add any other
// commands that are missing.
const commands = [
  // Will install any missing modules
  'npm install',
  // Will update any out of date modules
  'npm update',
  // Will build out the assets
  'npm run build',
];

/**
 * Acts as a wrapper to promisify spawn.
 * @param  {string} command - The command to run
 * @return {Promise} Runs
 */
const promisifySpawn = (command) => {
  return new Promise((resolve, reject) => {
    spawn(command, { shell: true, stdio: 'inherit' })
      .on('exit', (err) => {
        if (err) return reject(err);
        resolve();
      });
  });
};

/**
 * Loops through all the provided commands and listens for any errors. If an
 * error has been caught, it will exit the process with the err code provided
 * by the command/process.
 * @param  {Array} commands - Commands to run
 * @return {Promise} Completion of when all the commands have been ran.
*/
const runCommands = (commands) => {
  return commands
    .reduce((cur, command) => {
      return cur.then(() => promisifySpawn(command))
    }, Promise.resolve())
    .catch(err => process.exit(err));
};

const main = () => {
  runCommands(commands);
};

main();
