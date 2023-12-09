const packager = require('electron-packager');
const rebuild = require('electron-rebuild');
const fs = require('fs');

const args = process.argv.slice(2);

const configPath = `scripts/config/${args[0]}.package.json`;
const configJson = fs.readFileSync(configPath, 'utf8');
const config = JSON.parse(configJson);

// TODO: validate config file
console.log(config);

packager(Object.assign(config, {
  afterCopy: [
    (buildPath, electronVersion, platform, arch, callback) => {
      rebuild
        .rebuild({ buildPath, electronVersion, platform, arch })
        .then(() => callback())
        .catch((error) => callback(error));
    }
  ]
}));