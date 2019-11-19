const k8s = require('@kubernetes/client-node');
const k8sAdapter = require('./k8s-adapter');

const responses = {
  readNamespacedService: {
    valid: {
      response: {
        body: {
          kind: 'Service',
          apiVersion: 'v1',
          metadata: {
            name: 'qa-postgres',
            namespace: 'qa',
            selfLink: '/api/v1/namespaces/qa/services/qa-postgres',
            uid: 'e1fad0f0-07ec-11ea-a7d5-12d5a6c06b36',
            resourceVersion: '15288528',
            creationTimestamp: '2019-11-15T21:14:17Z',
            labels: {
              app: 'postgres',
              release: 'qa'
            }
          },
          spec: {
            ports: [
              {
                protocol: 'TCP',
                port: 5432,
                targetPort: 5432,
                nodePort: 30726
              }
            ],
            selector: {
              app: 'cloud-services',
              tier: 'postgres'
            },
            clusterIP: '172.20.76.153',
            type: 'NodePort',
            sessionAffinity: 'None',
            externalTrafficPolicy: 'Cluster'
          },
          status: {
            'loadBalancer': {}
          }
        }
      }
    },

    validNoSelectors: {
      response: {
        body: {
          kind: 'Service',
          apiVersion: 'v1',
          metadata: {
            name: 'qa-postgres',
            namespace: 'qa',
            selfLink: '/api/v1/namespaces/qa/services/qa-postgres',
            uid: 'e1fad0f0-07ec-11ea-a7d5-12d5a6c06b36',
            resourceVersion: '15288528',
            creationTimestamp: '2019-11-15T21:14:17Z',
            labels: {
              app: 'postgres',
              release: 'qa'
            }
          },
          spec: {
            ports: [
              {
                protocol: 'TCP',
                port: 5432,
                targetPort: 5432,
                nodePort: 30726
              }
            ],
            clusterIP: '172.20.76.153',
            type: 'NodePort',
            sessionAffinity: 'None',
            externalTrafficPolicy: 'Cluster'
          },
          status: {
            'loadBalancer': {}
          }
        }
      }
    },

    serviceNotFoundError: {
      response: {
        body: {
          kind: 'Status',
          apiVersion: 'v1',
          metadata: {},
          status: 'Failure',
          message: 'services \'qa-postgres\' not found',
          reason: 'NotFound',
          details: {
            name: 'qa-postgres',
            kind: 'services'
          },
          code: 404
        }
      }
    }
  }
};

describe('K8sAdapter', () => {
  describe('getServiceSelectors', () => {
    it('returns hash when service exists and has selectors', async () => {
      k8s.__mock('readNamespacedService', async () => {
        return responses.readNamespacedService.valid;
      });

      const result = await k8sAdapter.getServiceSelectors('qa-postgres', 'default');
      expect(result).toEqual({
        app: 'cloud-services',
        tier: 'postgres',
      });
    });

    it('returns empty hash when service exists and has no selectors', async () => {
      k8s.__mock('readNamespacedService', async () => {
        return responses.readNamespacedService.validNoSelectors;
      });

      const result = await k8sAdapter.getServiceSelectors('qa-postgres', 'default');
      expect(result).toEqual({});
    });

    it('returns undefined when service does not exist', async () => {
      k8s.__mock('readNamespacedService', async () => {
        throw responses.readNamespacedService.serviceNotFoundError;
      });

      const result = await k8sAdapter.getServiceSelectors('qa-postgres', 'default');
      expect(result).toEqual(undefined);
    });
  });
});
