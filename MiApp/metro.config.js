const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Web/Metro no incluyen .jfif por defecto; las fotos de mascotas son .jfif
if (!config.resolver.assetExts.includes('jfif')) {
  config.resolver.assetExts.push('jfif');
}

module.exports = config;
