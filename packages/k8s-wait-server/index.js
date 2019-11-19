const express = require('express');
const serviceResolver = require('./resolvers/service');
const jobResolver = require('./resolvers/job');

const PORT = 3000;

const app = express();

app.listen(PORT, () => {
 console.log("Server running on port 3000");
});

app.get("/service/:namespace/:name", async (req, res, next) => {
  const serviceName = req.params.name;
  const namespace = req.params.namespace;

  console.log(`Checking status for Service ${serviceName} in namespace ${namespace}...`);

  try {
    res.json({
      running: await serviceResolver.isReady(serviceName, namespace),
    });
  } catch (ex) {
    console.error(`Error when requesting status for Service ${serviceName}.`, ex);
    res.json({
      running: false,
      error: ex.toString(),
    });
  }
});

app.get("/job/:namespace/:name", async (req, res, next) => {
  const jobName = req.params.name;
  const namespace = req.params.namespace;

  console.log(`Checking status for Job ${jobName} in namespace ${namespace}...`);

  try {
    res.json({
      running: await jobResolver.isReady(jobName, namespace),
    });
  } catch (ex) {
    console.error(`Error when requesting status for Job ${jobName}.`, ex);
    res.json({
      running: false,
      error: ex.toString(),
    });
  }
});