'use strict';

const DV = require('../index.js'); // directory versioning module
const assert = require('assert');
const path = require('path');
const rmdir = require('rmdir-sync');
const fs = require('fs');

const testDir = path.resolve('./test/www');

describe('Directory versioning', () => {
  // Prepare directory for testing
  before(() => {
    if(fs.existsSync(testDir)) {
      rmdir(testDir);
    }
    fs.mkdirSync(testDir);
    fs.writeFileSync(`${testDir}/tmp`, "testing");
  });

  // Git should be installed
  it('Git should be installed', async () => {
    const result = await DV.GetGitVersionPromise();
    if(result && result.git && result.version) {
      assert.ok(1);
    } else {
      assert.fail("");
    }
  });

  // Init Git in directory
  it('Git init in directory', async () => {
    const result = await DV.GitInitPromise(testDir);
    if(result && /Git/i.test(result)) {
      assert.ok(1);
    } else {
      assert.fail("");
    }
  });

  // Commit change to repository
  it('Commit change to repository', async () => {
    const result = await DV.GitCommitPromise(testDir);
    if(result && /Daily\scommit/i.test(result)) {
      assert.ok(1);
    } else {
      assert.fail("");
    }
  })
});
