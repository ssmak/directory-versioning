'use strict';

const DV = require('./index.js');
const argv = require('yargs').argv;

if(argv.path) {
  // directory path is passed
  DV.GetGitVersionPromise().then(() => {
    // Git found -> check folder information (exist | not, git | not git)
    return DV.GetDirInfoPromise(argv.path);
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
    console.log('commit success.');
  }).catch(err => {
    // Git not found
    console.error('error: ', err);
  });
} else {
  // no directory path passed
  console.error('error: please specify a directory path.');
}
