const k8s = require('@kubernetes/client-node');

const kubeConfig = new k8s.KubeConfig()
kubeConfig.loadFromDefault()
const k8sCoreApi = kubeConfig.makeApiClient(k8s.CoreV1Api);
const k8sBatchApi = kubeConfig.makeApiClient(k8s.BatchV1Api);

async function getServiceSelectors(name, namespace='default') {
  try {
    console.log(`Checking if service ${name} in namespace ${namespace} is running...`);
    const res = await k8sCoreApi.readNamespacedService(name, namespace);
    if (!res.response.body || !res.response.body.spec || !res.response.body.spec.selector) {
      console.error(`Error getting service ${name} in namespace ${namespace}. Service exists but has no selector. Kubernetes response: ${res.response}`);
      return {};
    }
    console.log(`Got service pod selectors ${JSON.stringify(res.response.body.spec.selector)}`);
    return res.response.body.spec.selector;  
  } catch (ex) {
    if (ex.response) {
      console.error(`Error getting service ${name} in namespace ${namespace}. Kubernetes response:`, ex.response.body || ex.response);
    } else {
      console.error(`Error getting service ${name} in namespace ${namespace}. Exception:`, ex);
    }

    return undefined;
  }
}

async function getPodsByLabelSelectors(selectors, namespace) {
  const labelSelector = Object.entries(selectors).map(([k, v]) => `${k}=${v}`).join(',');
  console.log(`Getting pods for selectors ${labelSelector} in namespace ${namespace}...`);
  const fieldSelector = undefined;

  try {
    const res = await k8sCoreApi.listNamespacedPod(namespace, undefined, undefined, undefined, fieldSelector, labelSelector);
    if (!res.response.body) {
      console.error(`Error getting pods for service ${name} in namespace ${namespace}. Kubernetes response:`, res.response);
      return [];
    }
    const items = res.response.body.items || [];
    console.log(`Found ${items.length} pods that match label selector ${labelSelector}.`);
    return items;

  } catch (ex) {
    if (ex.response) {
      console.error(`Error getting service ${name} in namespace ${namespace}. Kubernetes response:`, ex.response.body || ex.response);
    } else {
      console.error(`Error getting service ${name} in namespace ${namespace}. Exception:`, ex);
    }

    return [];
  }
}

async function getJobStatus(name, namespace) {
  try {
    console.log(`Checking if job ${name} in namespace ${namespace} is complete...`);
    const res = await k8sBatchApi.readNamespacedJobStatus(name, namespace);
    if (!res.response.body || !res.response.body.status) {
      return {};
    }
    console.log(`Got job pod selectors ${JSON.stringify(res.response.body.status)}`);
    return res.response.body.status;  
  } catch (ex) {
    if (ex.response) {
      console.error(`Error getting job ${name} in namespace ${namespace}. Kubernetes response:`, ex.response.body || ex.response);
    } else {
      console.error(`Error getting job ${name} in namespace ${namespace}. Exception:`, ex);
    }

    return undefined;
  }
}

module.exports = {
  getServiceSelectors,
  getPodsByLabelSelectors,
  getJobStatus,
};