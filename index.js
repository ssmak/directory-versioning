/**
 * Directory Versioning Module
 */
'use strict';

const util = require('util');
const exec = util.promisify(require('child_process').exec);
const maxBuffer = 1024 * 1024 * 5; // 5Mb
const fs = require('fs');
const path = require('path');
const dateFormat = require('dateformat');

module.exports = {
  GetGitVersionPromise: () => {
    return new Promise((resolve, reject) => {
      exec('git version', { maxBuffer: maxBuffer }).then((values) => {
        const { stdout, stderr } = values;
        if(!stderr) {
          // check if GIT is available
          const signature = stdout.toLowerCase();
          if(/git/.test(signature) && /version/.test(signature) && /\d+\.\d+\.\d+/.test(signature)) {
            // GIT may exist -> try to find the GIT version
            const matches = signature.match(/(\d+\.\d+\.\d+)/);
            let gitVersion = null;
            if(matches && (gitVersion = matches[0])) {
              resolve({
                git: signature,
                version: gitVersion
              });
            } else {
              reject('GIT version is missing.');
            }
          } else {
            reject('GIT version is missing.');
          }
        } else {
          reject('GIT must be installed before running this script. (Please visit for more details: https://git-scm.com)');
        }
      }).catch(err => {
        reject('GIT must be installed before running this script. (Please visit for more details: https://git-scm.com)');
      });
    });
  },
  GetDirInfoPromise: (dir) => {
    return new Promise((resolve, reject) => {
      dir = dir.replace(/\s/g, '');
      fs.readdir(dir, (err, files) => {
        if(!err) {
          // folder exists -> check if directory already GIT repository
          fs.readdir(path.resolve(dir, '.git'), (err, files) => {
            if(!err) {
              resolve(true);
            } else {
              resolve(false);
            }
          });
        } else {
          // Error
          reject(err);
        }
      });
    });
  },
  GitInitPromise: (dir) => {
    return new Promise((resolve, reject) => {
      process.chdir(dir); // change working directory to Git repository
      exec('git init .', { maxBuffer: maxBuffer }).then((values) => {
        const { stdout, stderr } = values;
        if(!stderr) {
          resolve(stdout);
        } else {
          reject(stderr);
        }
      });
    });
  },
  GitCommitPromise: (dir) => {
    return new Promise((resolve, reject) => {
      process.chdir(dir); // change working directory to Git repository
      exec('git add -A', { maxBuffer: maxBuffer }).then((values) => {
        const { stdout, stderr } = values;
        if(!stderr) {
          // git add success -> git commit
          exec(`git commit -m "Daily commit."`, { maxBuffer: maxBuffer }).then((values) => {
            const { stdout, stderr } = values;
            if(!stderr) {
              // git commit success -> add a tag
              const tag = dateFormat(new Date(), "yyyymmdd-HHMMss");
              exec(`git tag ${tag}`, { maxBuffer: maxBuffer }).then((values) => {
                const { stdout, stderr } = values;
                if(!stderr) {
                  // git tag success
                  resolve(stdout);
                } else {
                  // git tag failed
                  reject(stderr);
                }
              }).catch(err => {
                reject(err);
              })
              resolve(stdout);
            } else {
              // git commit failed
              reject(stderr);
            }
          }).catch(err => {
            // check if no change to commit
            if(/nothing to commit/.test(err.stdout)) {
              // no change to commit -> treat as no error
              resolve('no change to commit');
            } else {
              reject(err);
            }
          });
        } else {
          // git add failed
          reject(stderr);
        }
      }).catch(err => {
        reject(err);
      });
    });
  }
};
