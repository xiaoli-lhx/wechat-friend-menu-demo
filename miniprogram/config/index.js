let localConfig = {};

try {
  localConfig = require('./local');
} catch (error) {
  localConfig = {};
}

const defaultCloudConfig = {
  envId: 'your-cloud-env-id',
  useCloudMenu: true,
  useCloudOrder: true
};

const cloudConfig = Object.assign(
  {},
  defaultCloudConfig,
  localConfig.cloudConfig || {}
);

module.exports = {
  cloudConfig
};
