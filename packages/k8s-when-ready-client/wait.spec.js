jest.mock('./request', () => ({
  get: jest.fn(async () => ({running: false})),
}));

const request = require('./request');
const wait = require('./wait');

const defaultOptions = Object.freeze({
  type: 'service',
  name: 'test',
  uptime: undefined,
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

  it('polls until server response running', async () => {
    request.get.mockResolvedValueOnce({
      running: false
    });
    request.get.mockResolvedValueOnce({
      running: true
    });

    const result = await wait(options());
    expect(result).toEqual(true);
  });

  it('returns false if server never responds running and timeout elapsed', async () => {
    request.get.mockResolvedValue({
      running: false
    });

    const result = await wait(options({timeout: 0.5}));
    expect(result).toEqual(false);
  });

  it('requests from expected url when no uptime passed', async () => {
    request.get.mockResolvedValue({
      running: true
    });
    await wait(options());
    expect(request.get).toBeCalledWith('http://server:3000/service/default/test');
  });

  it('requests from expected url when uptime passed', async () => {
    request.get.mockResolvedValue({
      running: true
    });
    await wait(options({ uptime: 5 }));
    expect(request.get).toBeCalledWith('http://server:3000/service/default/test?uptime=5');
  });
});