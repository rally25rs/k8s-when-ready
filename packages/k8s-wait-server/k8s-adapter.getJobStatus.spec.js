const k8s = require('@kubernetes/client-node');
const k8sAdapter = require('./k8s-adapter');

const responses = {
  readNamespacedJobStatus: {
    jobCompletedSuccessfully: {
      'response': {
        'statusCode': 200,
        'body': {
          'kind': 'Job',
          'apiVersion': 'batch/v1',
          'metadata': {
            'name': 'test-job',
            'namespace': 'qa',
            'selfLink': '/apis/batch/v1/namespaces/qa/jobs/test-job/status',
            'uid': '123abc',
            'resourceVersion': '15913674',
            'creationTimestamp': '2019-11-18T22:13:14Z',
            'labels': {
              'release': 'qa'
            }
          },
          'spec': {
            'parallelism': 1,
            'completions': 1,
            'backoffLimit': 2,
            'selector': {
              'matchLabels': {
                'controller-uid': '123abc'
              }
            },
            'template': {
              'metadata': {
                'creationTimestamp': null,
                'labels': {
                  'controller-uid': '123abc',
                  'job-name': 'test-job'
                }
              },
              'spec': {
                'restartPolicy': 'Never',
                'terminationGracePeriodSeconds': 30,
                'dnsPolicy': 'ClusterFirst',
                'securityContext': {},
                'schedulerName': 'default-scheduler'
              }
            }
          },
          'status': {
            'conditions': [
              {
                'type': 'Complete',
                'status': 'True',
                'lastProbeTime': '2019-11-18T22:13:43Z',
                'lastTransitionTime': '2019-11-18T22:13:43Z'
              }
            ],
            'startTime': '2019-11-18T22:13:14Z',
            'completionTime': '2019-11-18T22:13:43Z',
            'succeeded': 1
          }
        },
        'headers': {
          'audit-id': 'a661db83-31f3-43d3-8d14-d96b6d8c19fc',
          'content-type': 'application/json',
          'date': 'Mon, 18 Nov 2019 23:34:10 GMT',
          'content-length': '1830',
          'connection': 'close'
        },
        'request': {
          'uri': {
            'protocol': 'https:',
            'slashes': true,
            'auth': null,
            'host': '123abc.gr7.us-east-1.eks.amazonaws.com',
            'port': 443,
            'hostname': '123abc.gr7.us-east-1.eks.amazonaws.com',
            'hash': null,
            'search': null,
            'query': null,
            'pathname': '/apis/batch/v1/namespaces/qa/jobs/test-job/status',
            'path': '/apis/batch/v1/namespaces/qa/jobs/test-job/status',
            'href': 'https://123abc.gr7.us-east-1.eks.amazonaws.com/apis/batch/v1/namespaces/qa/jobs/test-job/status'
          },
          'method': 'GET',
          'headers': {
            'authorization': '',
            'Authorization': 'Bearer 123abc',
            'accept': 'application/json'
          }
        }
      },
      'body': {
        'apiVersion': 'batch/v1',
        'kind': 'Job',
        'metadata': {
          'annotations': {
            'helm.sh/hook': 'post-install',
            'helm.sh/hook-delete-policy': 'before-hook-creation',
            'helm.sh/hook-weight': '1'
          },
          'creationTimestamp': '2019-11-18T22:13:14.000Z',
          'labels': {
            'release': 'qa'
          },
          'name': 'test-job',
          'namespace': 'qa',
          'resourceVersion': '15913674',
          'selfLink': '/apis/batch/v1/namespaces/qa/jobs/test-job/status',
          'uid': '123abc'
        },
        'spec': {
          'backoffLimit': 2,
          'completions': 1,
          'parallelism': 1,
          'selector': {
            'matchLabels': {
              'controller-uid': '123abc'
            }
          },
          'template': {
            'metadata': {
              'creationTimestamp': null,
              'labels': {
                'controller-uid': '123abc',
                'job-name': 'test-job'
              }
            },
            'spec': {
              'containers': [
                {
                  'command': [
                    'sh',
                    '-c',
                    'echo "test"'
                  ],
                  'image': 'postgres:12',
                  'imagePullPolicy': 'IfNotPresent',
                  'name': 'postgres',
                  'resources': {},
                  'terminationMessagePath': '/dev/termination-log',
                  'terminationMessagePolicy': 'File'
                }
              ],
              'dnsPolicy': 'ClusterFirst',
              'initContainers': [
                {
                  'args': [
                    'service',
                    'qa-postgres',
                    '--namespace',
                    'qa'
                  ],
                  'image': 'virtualhold/k8s-wait-for:latest',
                  'imagePullPolicy': 'Always',
                  'name': 'test-job-user',
                  'resources': {},
                  'terminationMessagePath': '/dev/termination-log',
                  'terminationMessagePolicy': 'File'
                }
              ],
              'restartPolicy': 'Never',
              'schedulerName': 'default-scheduler',
              'securityContext': {},
              'terminationGracePeriodSeconds': 30
            }
          }
        },
        'status': {
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
        }
      }
    },

    jobCompletedWithFailures: {
      'response': {
        'statusCode': 200,
        'body': {
          'kind': 'Job',
          'apiVersion': 'batch/v1',
          'metadata': {
            'name': 'test-job',
            'namespace': 'qa',
            'selfLink': '/apis/batch/v1/namespaces/qa/jobs/test-job/status',
            'uid': '123abc',
            'resourceVersion': '15913914',
            'creationTimestamp': '2019-11-18T22:13:58Z',
            'labels': {
              'release': 'qa'
            },
            'annotations': {
              'helm.sh/hook': 'post-install',
              'helm.sh/hook-delete-policy': 'before-hook-creation',
              'helm.sh/hook-weight': '2'
            }
          },
          'spec': {
            'parallelism': 1,
            'completions': 1,
            'backoffLimit': 2,
            'selector': {
              'matchLabels': {
                'controller-uid': '123abc'
              }
            },
            'template': {
              'metadata': {
                'creationTimestamp': null,
                'labels': {
                  'controller-uid': '123abc',
                  'job-name': 'test-job'
                }
              },
              'spec': {
                'containers': [
                  {
                    'name': 'test-job',
                    'image': '123abc.dkr.ecr.us-east-2.amazonaws.com/test-image:latest',
                    'command': [
                      'sh',
                      '-c',
                      'bundle exec rake db:create'
                    ],
                    'ports': [
                      {
                        'containerPort': 3000,
                        'protocol': 'TCP'
                      }
                    ],
                    'resources': {},
                    'terminationMessagePath': '/dev/termination-log',
                    'terminationMessagePolicy': 'File',
                    'imagePullPolicy': 'IfNotPresent'
                  }
                ],
                'restartPolicy': 'Never',
                'terminationGracePeriodSeconds': 30,
                'dnsPolicy': 'ClusterFirst',
                'securityContext': {},
                'imagePullSecrets': [
                  {
                    'name': 'awsecr-cred'
                  }
                ],
                'schedulerName': 'default-scheduler'
              }
            }
          },
          'status': {
            'conditions': [
              {
                'type': 'Failed',
                'status': 'True',
                'lastProbeTime': '2019-11-18T22:14:31Z',
                'lastTransitionTime': '2019-11-18T22:14:31Z',
                'reason': 'BackoffLimitExceeded',
                'message': 'Job has reached the specified backoff limit'
              }
            ],
            'startTime': '2019-11-18T22:13:58Z',
            'failed': 3
          }
        },
        'headers': {
          'audit-id': '4987e5d3-25d0-484a-b498-60de5ccd425f',
          'content-type': 'application/json',
          'date': 'Mon, 18 Nov 2019 23:37:14 GMT',
          'connection': 'close',
          'transfer-encoding': 'chunked'
        },
        'request': {
          'uri': {
            'protocol': 'https:',
            'slashes': true,
            'auth': null,
            'host': '123abc.gr7.us-east-1.eks.amazonaws.com',
            'port': 443,
            'hostname': '123abc.gr7.us-east-1.eks.amazonaws.com',
            'hash': null,
            'search': null,
            'query': null,
            'pathname': '/apis/batch/v1/namespaces/qa/jobs/test-job/status',
            'path': '/apis/batch/v1/namespaces/qa/jobs/test-job/status',
            'href': 'https://123abc.gr7.us-east-1.eks.amazonaws.com/apis/batch/v1/namespaces/qa/jobs/test-job/status'
          },
          'method': 'GET',
          'headers': {
            'authorization': '',
            'Authorization': 'Bearer 123abc',
            'accept': 'application/json'
          }
        }
      },
      'body': {
        'apiVersion': 'batch/v1',
        'kind': 'Job',
        'metadata': {
          'annotations': {
            'helm.sh/hook': 'post-install',
            'helm.sh/hook-delete-policy': 'before-hook-creation',
            'helm.sh/hook-weight': '2'
          },
          'creationTimestamp': '2019-11-18T22:13:58.000Z',
          'labels': {
            'release': 'qa'
          },
          'name': 'test-job',
          'namespace': 'qa',
          'resourceVersion': '15913914',
          'selfLink': '/apis/batch/v1/namespaces/qa/jobs/test-job/status',
          'uid': '123abc'
        },
        'spec': {
          'backoffLimit': 2,
          'completions': 1,
          'parallelism': 1,
          'selector': {
            'matchLabels': {
              'controller-uid': '123abc'
            }
          },
          'template': {
            'metadata': {
              'creationTimestamp': null,
              'labels': {
                'controller-uid': '123abc',
                'job-name': 'test-job'
              }
            },
            'spec': {
              'containers': [
                {
                  'command': [
                    'sh',
                    '-c',
                    'bundle exec rake db:create'
                  ],
                  'image': '123abc.dkr.ecr.us-east-2.amazonaws.com/test-image:latest',
                  'imagePullPolicy': 'IfNotPresent',
                  'name': 'test-job',
                  'ports': [
                    {
                      'containerPort': 3000,
                      'protocol': 'TCP'
                    }
                  ],
                  'resources': {},
                  'terminationMessagePath': '/dev/termination-log',
                  'terminationMessagePolicy': 'File'
                }
              ],
              'dnsPolicy': 'ClusterFirst',
              'imagePullSecrets': [
                {
                  'name': 'awsecr-cred'
                }
              ],
              'restartPolicy': 'Never',
              'schedulerName': 'default-scheduler',
              'securityContext': {},
              'terminationGracePeriodSeconds': 30
            }
          }
        },
        'status': {
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
        }
      }
    },

    jobNotFoundError: {
      response: {
        body: {
          kind: 'Status',
          apiVersion: 'v1',
          metadata: {},
          status: 'Failure',
          message: 'jobs.batch \'test-job\' not found',
          reason: 'NotFound',
          details: { name: 'test-job', group: 'batch', kind: 'jobs' },
          code: 404
        }
      }
    }
  }
};

describe('K8sAdapter', () => {
  describe('getServiceSelectors', () => {
    it('returns job status when job finished success', async () => {
      k8s.__mock('readNamespacedJobStatus', async () => {
        return responses.readNamespacedJobStatus.jobCompletedSuccessfully;
      });

      const result = await k8sAdapter.getJobStatus('test-job', 'default');
      expect(result).toEqual(responses.readNamespacedJobStatus.jobCompletedSuccessfully.response.body.status);
    });

    it('returns job status when job finished failure', async () => {
      k8s.__mock('readNamespacedJobStatus', async () => {
        return responses.readNamespacedJobStatus.jobCompletedWithFailures;
      });

      const result = await k8sAdapter.getJobStatus('test-job', 'default');
      expect(result).toEqual(responses.readNamespacedJobStatus.jobCompletedWithFailures.response.body.status);
    });

    it('returns undefined when job does not exist', async () => {
      k8s.__mock('readNamespacedJobStatus', async () => {
        throw responses.readNamespacedJobStatus.jobNotFoundError;
      });

      const result = await k8sAdapter.getJobStatus('test-job', 'default');
      expect(result).toEqual(undefined);
    });
  });
});
