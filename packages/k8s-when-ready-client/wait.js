const request = require('./request');
const pause = require('./utils/pause');

module.exports = async function(options) {
  const {type, name, uptime, timeout, pollDelay, namespace, host, port} = options;
  const postData = {
    type,
    name,
    namespace,
    uptime,
  };
  let url = `http://${host}:${port}/${encodeURIComponent(type)}/${encodeURIComponent(namespace)}/${encodeURIComponent(name)}`;
  if (uptime !== undefined) {
    url += `?uptime=${uptime}`;
  }
  const stopPollingAt = new Date().getTime() + (timeout * 1000);

  while (new Date() < stopPollingAt) {
    try {
      const result = await request.get(url);
      if (result.running) {
        return true;
      }
    } catch (ex) {
      console.error(`Error while trying to query status: `, ex);
    }
    await pause(pollDelay);
  }

  return false;
};
