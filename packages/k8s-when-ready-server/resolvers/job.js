const k8s = require('../k8s-adapter');

function _hasEnoughUptime(jobStatus, uptimeSeconds) {
  if(jobStatus && jobStatus.completionTime) {
    const startedAt = new Date(jobStatus.completionTime);
    const now = new Date();
    return now - startedAt > uptimeSeconds * 1000;
  }
  return false;
}

async function  isReady(jobName, namespace='default', uptimeSeconds=0) {
  const status = await k8s.getJobStatus(jobName, namespace);
  if (status === undefined) {
    return false;
  }

  const succeeded = status.succeeded || 0;
  const running = status.running || 0;
  const failed = status.failed || 0;

  console.log(`[${running} Running / ${succeeded} Succeeded / ${failed} Failed] for job ${jobName} in namespace ${namespace}.`);
  return succeeded > 0 && _hasEnoughUptime(status, uptimeSeconds);
}

module.exports = {
  isReady,
}