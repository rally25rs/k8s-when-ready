let apiFunctions = {};

class KubeConfig {
  loadFromDefault() {}

  makeApiClient() {
    return apiFunctions;
  }
}

function __mock(funcName, func) {
  apiFunctions[funcName] = func;
}

module.exports = {
  KubeConfig,
  __mock,
}