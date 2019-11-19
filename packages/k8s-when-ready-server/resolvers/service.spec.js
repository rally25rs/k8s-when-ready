jest.mock('../k8s-adapter', () => ({
  getServiceSelectors: jest.fn(() => { return {}; }),
  getPodsByLabelSelectors: jest.fn(() => { return []; }),
}));

const k8sAdapter = require('../k8s-adapter');
const serviceResolver = require('./service');

const ONE_YEAR = 31536000;
const ONE_HUNDRED_YEARS = ONE_YEAR * 100;

const multiplePodsAllContainersReady = [
  {
    "status": {
      "phase": "Running",
      "containerStatuses": [
        {
          "name": "container-one",
          "state": {
            "running": {
              "startedAt": "2019-11-15T21:14:54Z"
            }
          },
          "ready": true,
        },

        {
          "name": "container-two",
          "state": {
            "running": {
              "startedAt": "2019-11-15T21:14:54Z"
            }
          },
          "ready": true,
        }
      ],
    }
  },

  {
    "status": {
      "phase": "Running",
      "containerStatuses": [
        {
          "name": "container-one",
          "state": {
            "running": {
              "startedAt": "2019-11-15T21:14:54Z"
            }
          },
          "ready": true,
        },

        {
          "name": "container-two",
          "state": {
            "running": {
              "startedAt": "2019-11-15T21:14:54Z"
            }
          },
          "ready": true,
        }
      ],
    }
  }
];

const multiplePodsAllContainersFailed = [
  {
    "status": {
      "phase": "Running",
      "containerStatuses": [
        {
          "name": "container-one",
          "state": {
            "waiting": {
              "reason": "CrashLoopBackOff",
              "message": "Back-off 5m0s restarting failed"
            }
          },
          "ready": false,
        },

        {
          "name": "container-two",
          "state": {
            "waiting": {
              "reason": "CrashLoopBackOff",
              "message": "Back-off 5m0s restarting failed"
            }
          },
          "ready": false,
        }
      ],
    }
  },

  {
    "status": {
      "phase": "Running",
      "containerStatuses": [
        {
          "name": "container-one",
          "state": {
            "waiting": {
              "reason": "CrashLoopBackOff",
              "message": "Back-off 5m0s restarting failed"
            }
          },
          "ready": false,
        },

        {
          "name": "container-two",
          "state": {
            "waiting": {
              "reason": "CrashLoopBackOff",
              "message": "Back-off 5m0s restarting failed"
            }
          },
          "ready": false,
        }
      ],
    }
  }
];

const multiplePodsSomeContainersFailed = [
  {
    "status": {
      "phase": "Running",
      "containerStatuses": [
        {
          "name": "container-one",
          "state": {
            "running": {
              "startedAt": "2019-11-15T21:14:54Z"
            }
          },
          "ready": true,
        },

        {
          "name": "container-two",
          "state": {
            "waiting": {
              "reason": "CrashLoopBackOff",
              "message": "Back-off 5m0s restarting failed"
            }
          },
          "ready": false,
        }
      ],
    }
  },

  {
    "status": {
      "phase": "Running",
      "containerStatuses": [
        {
          "name": "container-one",
          "state": {
            "running": {
              "startedAt": "2019-11-15T21:14:54Z"
            }
          },
          "ready": true,
        },

        {
          "name": "container-two",
          "state": {
            "running": {
              "startedAt": "2019-11-15T21:14:54Z"
            }
          },
          "ready": true,
        },
      ],
    }
  }
];

describe('Service Resolver', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('isReady', () => {
    it('returns true when service exists and all containers in all pods are running', async () => {
      k8sAdapter.getPodsByLabelSelectors.mockReturnValueOnce(multiplePodsAllContainersReady);
      const result = await serviceResolver.isReady('serviceName', 'default');
      expect(result).toEqual(true);
    });

    it('returns false when service exists and some containers in some pods are not running', async () => {
      k8sAdapter.getPodsByLabelSelectors.mockReturnValueOnce(multiplePodsSomeContainersFailed);
      const result = await serviceResolver.isReady('serviceName', 'default');
      expect(result).toEqual(false);
    });

    it('returns false when service exists and all containers in all pods are not running', async () => {
      k8sAdapter.getPodsByLabelSelectors.mockReturnValueOnce(multiplePodsAllContainersFailed);
      const result = await serviceResolver.isReady('serviceName', 'default');
      expect(result).toEqual(false);
    });

    it('returns false when service does not exist', async () => {
      k8sAdapter.getServiceSelectors.mockReturnValueOnce(undefined);
      const result = await serviceResolver.isReady('serviceName', 'default');
      expect(result).toEqual(false);
    });

    it('uses default namespace if one is not specified', async () => {
      await serviceResolver.isReady('serviceName');
      expect(k8sAdapter.getServiceSelectors).toBeCalledWith('serviceName', 'default');
    });

    it('returns false when the service is running, but for less than the requested uptime', async () => {
      k8sAdapter.getPodsByLabelSelectors.mockReturnValueOnce(multiplePodsAllContainersReady);
      const result = await serviceResolver.isReady('serviceName', 'default', ONE_HUNDRED_YEARS);
      expect(result).toEqual(false);
    });
  });
});
