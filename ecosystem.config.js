const path = require('path');

const apps = [
  /*{
      name: 'api-server-app',
      cwd: './apps/api-server-app',
      script: 'npm',
      args: 'start',
      merge_log: true,
      instances: 1,
      min_uptime: 10000,
      watch: false,
      env: {
        RABBITMQ_SERVER_URL,
      },
    },
    {
      name: 'music-player-client-app',
      cwd: './apps/music-player-client-app',
      script: 'npm',
      args: 'run serve',
      merge_log: true,
      instances: 1,
      watch: false,
      env: {},
    },
    {
      name: 'notification-server-app',
      cwd: './apps/notification-server-app',
      script: 'npm',
      args: 'start',
      merge_log: true,
      instances: 1,
      watch: false,
      env: {
        RABBITMQ_SERVER_URL,
      },
    },*/
];

const technicalPackages = [
  'ffmpeg', 'hub-publish', 'mq', 'types', 'filesystem',
  'error', 'music-metadata', 'utils', 'database', 'hash',
];
const businessPackages = [
  'spotify', 'notification', 'youtube', 'downloader', 'music',
  'playlist', 'user', 'validation',
];

const packageNames = [
  ...technicalPackages.map(pkg => path.join('technical', pkg)),
  ...businessPackages.map(pkg => path.join('business', pkg)),
];
const packages = [];

for (const packageName of packageNames) {
  const packagePath = `./packages/${packageName}-pkg`;
  const packageCompiler = {
    name: packageName,
    cwd: packagePath,
    script: 'npm',
    args: 'run build-watch',
    merge_log: true,
    instances: 1,
    watch: false
  };

  packages.push(packageCompiler);
}

module.exports = {
  apps: [...apps, ...packages],
};
