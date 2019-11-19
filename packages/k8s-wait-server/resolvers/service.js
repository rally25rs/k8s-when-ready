const k8s = require('../k8s-adapter');

function _hasEnoughUptime(containerStatus, uptimeSeconds) {
  if(containerStatus && containerStatus.state && containerStatus.state.running && containerStatus.state.running.startedAt) {
    const startedAt = new Date(containerStatus.state.running.startedAt);
    const now = new Date();
    return now - startedAt > uptimeSeconds * 1000;
  }
  return false;
}

async function  isReady(serviceName, namespace='default', uptimeSeconds=5) {
  const selectors = await k8s.getServiceSelectors(serviceName, namespace);
  if (selectors !== undefined) {
    const pods = await k8s.getPodsByLabelSelectors(selectors, namespace);
    const readyStates = [];
    pods.forEach(pod => pod.status.containerStatuses.forEach(containerStatus => readyStates.push(containerStatus.ready && _hasEnoughUptime(containerStatus, uptimeSeconds))));
    const numReady = readyStates.filter(state => !!state).length;
    console.log(`[${numReady}/${readyStates.length}] containers are ready for service ${serviceName} in namespace ${namespace}.`);
    return numReady === readyStates.length;
  }
  return false;
}

module.exports = {
  isReady,
}