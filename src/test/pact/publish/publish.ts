'use strict';

/* eslint no-console: 0 */
const path = require('path');

const pact = require('@pact-foundation/pact-node');
const config = require('config');
const git = require('git-rev-sync');

console.log('PACT_TAG', process.env.PACT_TAG);

if (process.env.PACT_TAG === 'master') {
  const opts = {
    pactFilesOrDirs: [path.resolve(process.cwd(), config.services.pact.pactDirectory)],
    pactBroker: config.services.pact.url,
    consumerVersion: git.short(),
    tags: config.services.pact.tag,
  };

  const certPath = path.resolve(__dirname, './ca-bundle.crt');
  process.env.SSL_CERT_FILE = certPath;

  pact
    .publishPacts(opts)
    .then(() => {
      console.log('Pact contract publishing complete!');
      process.exit(0);
    })
    .catch(e => {
      console.log('Pact contract publishing failed: ', e);
      process.exit(1);
    });
} else {
  console.log('Not publishing Pact contract on non-master branch');
  process.exit(1);
}