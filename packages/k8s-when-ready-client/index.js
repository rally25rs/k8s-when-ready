const yargs = require('yargs');
const wait = require('./wait');

const DEFAULT_TIMEOUT_SECONDS = 60 * 5;
const DEFAULT_POLL_DELAY_SECONDS = 1;
const DEFAULT_NAMESPACE='default';
const DEFAULT_SERVER_HOST='k8s-when-ready-server';
const DEFAULT_SERVER_PORT='3000';

yargs.option('type', {
  choices: ['service', 'job'],
  description: 'Whether to wait for a Service or a Job.',
  required: true
}).option('name', {
  type: 'string',
  description: 'The name of the service or job to wait for.',
  required: true
}).option('uptime', {
  type: 'number',
  description: 'The number of seconds of uptime an item should have before considering it "running". If not specified, the default is 5 seconds for Services, 0 seconds for Jobs.'
}).option('timeout', {
  type: 'number',
  default: DEFAULT_TIMEOUT_SECONDS,
  description: 'The duration in seconds to wait before canceling the wait. The process will exit with a non-0 exit code.'
}).option('poll-delay', {
  default: DEFAULT_POLL_DELAY_SECONDS,
  description: 'The duration in seconds to wait between each check to see if the service is running.'
}).option('namespace', {
  alias: 'n',
  default: DEFAULT_NAMESPACE,
  description: 'The namespace to check in.'
}).option('host', {
  alias: 'h',
  default: DEFAULT_SERVER_HOST,
  description: 'The hostname of the k8s-when-ready-server.'
}).option('port', {
  alias: 'p',
  default: DEFAULT_SERVER_PORT,
  description: 'The port for the k8s-when-ready-server.'
});

console.log(`Starting to wait. Parameters: ${JSON.stringify(yargs.argv, null, 2)}`);

wait(yargs.argv).then(running => {
  if(running) {
    console.log('Detected running state. Done waiting. Exiting successfully.');
    process.exit(0);
  }

  console.log('Timeout has elapsed without detecting running state. Done waiting. Exiting with failure.');
  process.exit(1);
}).catch(ex => {
  console.error(`Critical error. Exiting.`, ex);
  process.exit(2);
});
