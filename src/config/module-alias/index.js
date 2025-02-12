
const moduleAlias = require('module-alias');
const path = require('path');

const { compilerOptions } = require('../../../jsconfig.json');

const aliasPaths = {};

for (const [key, value] of Object.entries(compilerOptions.paths)) {
  const pathName = key.split('/').shift();
  const [pathValue] = value;

  const pathValueFormatted = pathValue.substring(0, pathValue.length - 2);

  Object.assign(aliasPaths, { [pathName]: path.join(__dirname, '..', '..', pathValueFormatted) });
}

moduleAlias.addAliases(aliasPaths);

// {
//   '@src': path.join(__dirname, '..'),
//   '@config': path.join(__dirname, '..', 'config'),
//   '@utils': path.join(__dirname, '..', 'utils'),
//   '@app': path.join(__dirname, '..', 'app'),
//   '@routes': path.join(__dirname, '..', 'app', 'routes')
// }
