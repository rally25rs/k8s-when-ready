const k8s = require('@kubernetes/client-node');
const k8sAdapter = require('./k8s-adapter');

const responses = {
  listNamespacedPod: {
    podIsRunning: {
      response: {
        body: {
          "kind": "PodList",
          "apiVersion": "v1",
          "metadata": {
            "selfLink": "/api/v1/namespaces/qa/pods",
            "resourceVersion": "15695638"
          },
          "items": [
            {
              "metadata": {
                "name": "qa-postgres-77b499899-nq2k9",
                "generateName": "qa-postgres-77b499899-",
                "namespace": "qa",
                "selfLink": "/api/v1/namespaces/qa/pods/qa-postgres-77b499899-nq2k9",
                "uid": "e20c455f-07ec-11ea-917f-0ae652d4082a",
                "resourceVersion": "15288873",
                "creationTimestamp": "2019-11-15T21:14:17Z",
                "labels": {
                  "app": "cloud-services",
                  "pod-template-hash": "77b499899",
                  "tier": "postgres"
                },
                "annotations": {
                  "kubernetes.io/psp": "eks.privileged"
                },
                "ownerReferences": [
                  {
                    "apiVersion": "apps/v1",
                    "kind": "ReplicaSet",
                    "name": "qa-postgres-77b499899",
                    "uid": "e205c3c9-07ec-11ea-917f-0ae652d4082a",
                    "controller": true,
                    "blockOwnerDeletion": true
                  }
                ]
              },
              "spec": {
                "volumes": [
                  {
                    "name": "postgres-persistent-storage",
                    "persistentVolumeClaim": {
                      "claimName": "qa-postgres-pv-claim"
                    }
                  },
                  {
                    "name": "default-token-sss4s",
                    "secret": {
                      "secretName": "default-token-sss4s",
                      "defaultMode": 420
                    }
                  }
                ],
                "containers": [
                  {
                    "name": "postgres",
                    "image": "postgres:12",
                    "ports": [
                      {
                        "name": "postgres",
                        "containerPort": 5432,
                        "protocol": "TCP"
                      }
                    ],
                    "env": [
                      {
                        "name": "PGDATA",
                        "value": "/var/lib/postgresql/data/pgdata"
                      }
                    ],
                    "resources": {},
                    "volumeMounts": [
                      {
                        "name": "postgres-persistent-storage",
                        "mountPath": "/var/lib/postgresql/data"
                      },
                      {
                        "name": "default-token-sss4s",
                        "readOnly": true,
                        "mountPath": "/var/run/secrets/kubernetes.io/serviceaccount"
                      }
                    ],
                    "terminationMessagePath": "/dev/termination-log",
                    "terminationMessagePolicy": "File",
                    "imagePullPolicy": "IfNotPresent"
                  }
                ],
                "restartPolicy": "Always",
                "terminationGracePeriodSeconds": 30,
                "dnsPolicy": "ClusterFirst",
                "serviceAccountName": "default",
                "serviceAccount": "default",
                "nodeName": "ip-10-199-1-124.ec2.internal",
                "securityContext": {},
                "schedulerName": "default-scheduler",
                "tolerations": [
                  {
                    "key": "node.kubernetes.io/not-ready",
                    "operator": "Exists",
                    "effect": "NoExecute",
                    "tolerationSeconds": 300
                  },
                  {
                    "key": "node.kubernetes.io/unreachable",
                    "operator": "Exists",
                    "effect": "NoExecute",
                    "tolerationSeconds": 300
                  }
                ],
                "priority": 0,
                "enableServiceLinks": true
              },
              "status": {
                "phase": "Running",
                "conditions": [
                  {
                    "type": "Initialized",
                    "status": "True",
                    "lastProbeTime": null,
                    "lastTransitionTime": "2019-11-15T21:14:32Z"
                  },
                  {
                    "type": "Ready",
                    "status": "True",
                    "lastProbeTime": null,
                    "lastTransitionTime": "2019-11-15T21:14:55Z"
                  },
                  {
                    "type": "ContainersReady",
                    "status": "True",
                    "lastProbeTime": null,
                    "lastTransitionTime": "2019-11-15T21:14:55Z"
                  },
                  {
                    "type": "PodScheduled",
                    "status": "True",
                    "lastProbeTime": null,
                    "lastTransitionTime": "2019-11-15T21:14:32Z"
                  }
                ],
                "hostIP": "10.199.1.124",
                "podIP": "10.199.1.79",
                "startTime": "2019-11-15T21:14:32Z",
                "containerStatuses": [
                  {
                    "name": "postgres",
                    "state": {
                      "running": {
                        "startedAt": "2019-11-15T21:14:54Z"
                      }
                    },
                    "lastState": {},
                    "ready": true,
                    "restartCount": 0,
                    "image": "postgres:12",
                    "imageID": "docker-pullable://postgres@sha256:3dbb3cb945dfe0316dcdd3a75e8a3c6192ce30f87a9952f285b9ba2f02b81982",
                    "containerID": "docker://ab45a572d650514b18ce054c812cf87261ca6d24e093f9245d52e7bf66a5a0b2"
                  }
                ],
                "qosClass": "BestEffort"
              }
            }
          ]
        }
      }
    },

    podIsCrashLoopBackOff: {
      response: {
        body: {
          "kind": "PodList",
          "apiVersion": "v1",
          "metadata": {
            "selfLink": "/api/v1/namespaces/qa/pods",
            "resourceVersion": "15696383"
          },
          "items": [
            {
              "metadata": {
                "name": "qa-continuity-api-7f6b77b85b-lxjtj",
                "generateName": "qa-continuity-api-7f6b77b85b-",
                "namespace": "qa",
                "selfLink": "/api/v1/namespaces/qa/pods/qa-continuity-api-7f6b77b85b-lxjtj",
                "uid": "e20bf14c-07ec-11ea-917f-0ae652d4082a",
                "resourceVersion": "15695705",
                "creationTimestamp": "2019-11-15T21:14:17Z",
                "labels": {
                  "app": "cloud-services",
                  "pod-template-hash": "7f6b77b85b",
                  "tier": "continuity-api"
                },
                "annotations": {
                  "kubernetes.io/psp": "eks.privileged"
                },
                "ownerReferences": [
                  {
                    "apiVersion": "apps/v1",
                    "kind": "ReplicaSet",
                    "name": "qa-continuity-api-7f6b77b85b",
                    "uid": "e20609a3-07ec-11ea-917f-0ae652d4082a",
                    "controller": true,
                    "blockOwnerDeletion": true
                  }
                ]
              },
              "spec": {
                "volumes": [
                  {
                    "name": "default-token-sss4s",
                    "secret": {
                      "secretName": "default-token-sss4s",
                      "defaultMode": 420
                    }
                  }
                ],
                "containers": [
                  {
                    "name": "continuity-api",
                    "image": "446235720820.dkr.ecr.us-east-2.amazonaws.com/cloud-services-continuity-api:03615",
                    "ports": [
                      {
                        "containerPort": 3000,
                        "protocol": "TCP"
                      }
                    ],
                    "env": [
                      {
                        "name": "RAILS_ENV",
                        "value": "production"
                      },
                      {
                        "name": "RAILS_MASTER_KEY",
                        "value": "b1c52be1b3ae09597adb714becfe5579"
                      },
                      {
                        "name": "RAILS_LOG_TO_STDOUT",
                        "value": "true"
                      },
                      {
                        "name": "MESSAGE_BUS_HOST",
                        "value": "qa-rabbitmq"
                      },
                      {
                        "name": "MESSAGE_BUS_USER",
                        "value": "cloud-services"
                      },
                      {
                        "name": "MESSAGE_BUS_PASSWORD",
                        "value": "password"
                      },
                      {
                        "name": "DB_HOST",
                        "value": "qa-postgres"
                      },
                      {
                        "name": "DB_NAME",
                        "value": "continuity_prod"
                      }
                    ],
                    "resources": {},
                    "volumeMounts": [
                      {
                        "name": "default-token-sss4s",
                        "readOnly": true,
                        "mountPath": "/var/run/secrets/kubernetes.io/serviceaccount"
                      }
                    ],
                    "terminationMessagePath": "/dev/termination-log",
                    "terminationMessagePolicy": "File",
                    "imagePullPolicy": "IfNotPresent"
                  }
                ],
                "restartPolicy": "Always",
                "terminationGracePeriodSeconds": 30,
                "dnsPolicy": "ClusterFirst",
                "serviceAccountName": "default",
                "serviceAccount": "default",
                "nodeName": "ip-10-199-1-124.ec2.internal",
                "securityContext": {},
                "imagePullSecrets": [
                  {
                    "name": "awsecr-cred"
                  }
                ],
                "schedulerName": "default-scheduler",
                "tolerations": [
                  {
                    "key": "node.kubernetes.io/not-ready",
                    "operator": "Exists",
                    "effect": "NoExecute",
                    "tolerationSeconds": 300
                  },
                  {
                    "key": "node.kubernetes.io/unreachable",
                    "operator": "Exists",
                    "effect": "NoExecute",
                    "tolerationSeconds": 300
                  }
                ],
                "priority": 0,
                "enableServiceLinks": true
              },
              "status": {
                "phase": "Running",
                "conditions": [
                  {
                    "type": "Initialized",
                    "status": "True",
                    "lastProbeTime": null,
                    "lastTransitionTime": "2019-11-15T21:15:28Z"
                  },
                  {
                    "type": "Ready",
                    "status": "False",
                    "lastProbeTime": null,
                    "lastTransitionTime": "2019-11-17T21:58:21Z",
                    "reason": "ContainersNotReady",
                    "message": "containers with unready status: [continuity-api]"
                  },
                  {
                    "type": "ContainersReady",
                    "status": "False",
                    "lastProbeTime": null,
                    "lastTransitionTime": "2019-11-17T21:58:21Z",
                    "reason": "ContainersNotReady",
                    "message": "containers with unready status: [continuity-api]"
                  },
                  {
                    "type": "PodScheduled",
                    "status": "True",
                    "lastProbeTime": null,
                    "lastTransitionTime": "2019-11-15T21:14:17Z"
                  }
                ],
                "hostIP": "10.199.1.124",
                "podIP": "10.199.1.233",
                "startTime": "2019-11-15T21:14:17Z",
                "containerStatuses": [
                  {
                    "name": "continuity-api",
                    "state": {
                      "waiting": {
                        "reason": "CrashLoopBackOff",
                        "message": "Back-off 5m0s restarting failed container=continuity-api pod=qa-continuity-api-7f6b77b85b-lxjtj_qa(e20bf14c-07ec-11ea-917f-0ae652d4082a)"
                      }
                    },
                    "lastState": {
                      "terminated": {
                        "exitCode": 1,
                        "reason": "Error",
                        "startedAt": "2019-11-17T21:58:19Z",
                        "finishedAt": "2019-11-17T21:58:21Z",
                        "containerID": "docker://bfe1c129b7acf2eb66b1a45087d99627085e5c09018bcfc065ccde70317c4a8e"
                      }
                    },
                    "ready": false,
                    "restartCount": 573,
                    "image": "446235720820.dkr.ecr.us-east-2.amazonaws.com/cloud-services-continuity-api:03615",
                    "imageID": "docker-pullable://446235720820.dkr.ecr.us-east-2.amazonaws.com/cloud-services-continuity-api@sha256:3cd9bbd2dc7deb4029afb48ce99e789856a5e7f2a6bc07adef487677b78acdd8",
                    "containerID": "docker://bfe1c129b7acf2eb66b1a45087d99627085e5c09018bcfc065ccde70317c4a8e"
                  }
                ],
                "qosClass": "BestEffort"
              }
            }
          ]
        }
      }
    },

    noPodsMatchSelector: {
      response: {
        body: {
          "kind": "PodList",
          "apiVersion": "v1",
          "metadata": {
            "selfLink": "/api/v1/namespaces/qa/pods",
            "resourceVersion": "15698353"
          },
          "items": []
        }
      }
    },
  }
};

describe('K8sAdapter', () => {
  describe('getPodsByLabelSelectors', () => {
    it('returns array of pods when pods match selectors', async () => {
      k8s.__mock('listNamespacedPod', async () => {
        return responses.listNamespacedPod.podIsRunning;
      });

      const result = await k8sAdapter.getPodsByLabelSelectors({app: 'test'}, 'default');
      expect(result).toEqual(responses.listNamespacedPod.podIsRunning.response.body.items);
    });

    it('returns empty array when no pods match selectors', async () => {
      k8s.__mock('listNamespacedPod', async () => {
        return responses.listNamespacedPod.noPodsMatchSelector;
      });

      const result = await k8sAdapter.getPodsByLabelSelectors({app: 'test'}, 'default');
      expect(result).toEqual(responses.listNamespacedPod.noPodsMatchSelector.response.body.items);
    });
  });
});
