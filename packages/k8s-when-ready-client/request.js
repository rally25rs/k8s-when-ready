const http = require('http');

function get(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (resp) => {
      let data = '';

      // A chunk of data has been recieved.
      resp.on('data', (chunk) => {
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      resp.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (ex) {
          console.error(`Failed to JSON parse the server response: ${data}`, ex);
          reject(ex);
        }
      });

    }).on("error", (err) => {
      console.error(`Error: ${err.message}`);
      reject(err);
    });
  });
}

module.exports = {
  get,
};
