#!/usr/bin/env node

'use strict';

const path = require('path');
const DV = require(path.resolve(__dirname, 'lib/dr.js'));
const argv = require('yargs').argv;
const appConfig = require(path.resolve(__dirname, 'package.json'));
const chalk = require('chalk');
const figlet = require('figlet');

// Clear up console
console.clear();

/*
 * Print application information
 */
console.log(chalk.yellow(figlet.textSync(appConfig.name, {
})));
console.log(chalk.yellow(appConfig.description), '\n');
console.log(chalk.yellow(`Version: ${appConfig.version}`));
console.log(chalk.yellow(`Repository: ${appConfig.repository.url}`));
console.log(chalk.yellow(`Author: ${appConfig.author}`));
console.log(chalk.yellow(`License: ${appConfig.license}`));
console.log('\nUsage: directory-versioning --path <DIRECTORY_PATH> [--d] [--i 10] [--q]');
console.log('d: Run as dedicated process.\ni: Time interval, unit in second(s).\nq: Quiet mode.');
console.log('\n');

/*
 * Disable all stdout
 */
if(argv.q) {
  console.log = console.error = console.info = console.warning = () => {};
}

const createVersion = () => {
  if(argv.path) {
    // directory path is passed
    DV.GetGitVersionPromise().then(() => {
      // Git found -> check folder information (exist | not, git | not git)
      return DV.GetDirInfoPromise(path.resolve(argv.path));
    }).then((isGitRepository) => {
      if(isGitRepository) {
        // already Git repository
        Promise.resolve();
      } else {
        // not a Git repository -> init
        return DV.GitInitPromise(argv.path);
      }
    }).then((values) => {
      // Git repository ready -> commit
      return DV.GitCommitPromise(argv.path);
    }).then((values) => {
      // commit success
      console.log(chalk.green(`[Info] version is checked on ${new Date().toLocaleString()}.`));
    }).catch(err => {
      // Git not found
      console.error(chalk.red('[Warning] Git not installed.'));
    });
  } else {
    // no directory path passed
    console.error(chalk.red('[Warning] please specify a directory path.'));
  }
}

if(argv.d) {
  console.log(chalk.green('[Info] directory-versioning is running and detached..'));

  let interval = 10; // default interval, unit in (s)
  if(argv.i && /^\d+$/.test(argv.i)) {
    interval = parseInt(argv.i);
  }

  setInterval(() => {
    createVersion();
  }, interval * 1000);
} else {
  createVersion();
}
