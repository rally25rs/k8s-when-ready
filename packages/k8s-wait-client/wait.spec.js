jest.mock('./request', () => ({
  get: jest.fn(async () => ({running: false})),
}));

const request = require('./request');
const wait = require('./wait');

const defaultOptions = Object.freeze({
  type: 'service',
  name: 'test',
  uptime: 0,
  timeout: 5,
  pollDelay: 0.1,
  namespace: 'default',
  host: 'server',
  port: 3000,
});

function options(opts={}) {
  return Object.assign({}, defaultOptions, opts);
};

describe('Wait', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('continues polling if the server does not exist or is not running yet', async () => {
    request.get.mockRejectedValueOnce(new Error({
      message: 'Error: getaddrinfo ENOTFOUND server:80',
      errno: 'ENOTFOUND',
      code: 'ENOTFOUND',
      syscall: 'getaddrinfo',
      hostname: 'server',
      host: 'server',
      port: 80
    }));
    request.get.mockResolvedValueOnce({
      running: true
    });

    const result = await wait(options());
    expect(result).toEqual(true);
  });
});