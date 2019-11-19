jest.mock('../k8s-adapter', () => ({
  getJobStatus: jest.fn(() => { return {}; }),
}));

const k8sAdapter = require('../k8s-adapter');
const jobResolver = require('./job');

const ONE_YEAR = 31536000;
const ONE_HUNDRED_YEARS = ONE_YEAR * 100;

const allJobsSucceeded = {
  'completionTime': '2019-11-18T22:13:43.000Z',
  'conditions': [
    {
      'lastProbeTime': '2019-11-18T22:13:43.000Z',
      'lastTransitionTime': '2019-11-18T22:13:43.000Z',
      'status': 'True',
      'type': 'Complete'
    }
  ],
  'startTime': '2019-11-18T22:13:14.000Z',
  'succeeded': 1
};

const allJobsFailed = {
  'conditions': [
    {
      'lastProbeTime': '2019-11-18T22:14:31.000Z',
      'lastTransitionTime': '2019-11-18T22:14:31.000Z',
      'message': 'Job has reached the specified backoff limit',
      'reason': 'BackoffLimitExceeded',
      'status': 'True',
      'type': 'Failed'
    }
  ],
  'failed': 3,
  'startTime': '2019-11-18T22:13:58.000Z'
};

const jobHadFailuresThenSucceeded = {
  'completionTime': '2019-11-18T22:13:43.000Z',
  'conditions': [
    {
      'lastProbeTime': '2019-11-18T22:13:43.000Z',
      'lastTransitionTime': '2019-11-18T22:13:43.000Z',
      'status': 'True',
      'type': 'Complete'
    }
  ],
  'failed': 3,
  'startTime': '2019-11-18T22:13:14.000Z',
  'succeeded': 1
};

describe('Job Resolver', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('isReady', () => {
    it('returns true when job has successes', async () => {
      k8sAdapter.getJobStatus.mockReturnValueOnce(allJobsSucceeded);
      const result = await jobResolver.isReady('jobName', 'default');
      expect(result).toEqual(true);
    });

    it('returns false when job has 0 successes', async () => {
      k8sAdapter.getJobStatus.mockReturnValueOnce(allJobsFailed);
      const result = await jobResolver.isReady('jobName', 'default');
      expect(result).toEqual(false);
    });

    it('returns false when job does not exist', async () => {
      k8sAdapter.getJobStatus.mockReturnValueOnce(undefined);
      const result = await jobResolver.isReady('jobName', 'default');
      expect(result).toEqual(false);
    });

    it('uses default namespace if one is not specified', async () => {
      await jobResolver.isReady('jobName');
      expect(k8sAdapter.getJobStatus).toBeCalledWith('jobName', 'default');
    });

    it('returns true when job has successes, but for less than the requested uptime', async () => {
      k8sAdapter.getJobStatus.mockReturnValueOnce(allJobsSucceeded);
      const result = await jobResolver.isReady('jobName', 'default', ONE_HUNDRED_YEARS);
      expect(result).toEqual(false);
    });
  });
});
