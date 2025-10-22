const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

// Enhanced resolver configuration
config.resolver.assetExts = config.resolver.assetExts.filter(ext => ext !== 'svg');
config.resolver.sourceExts = [...config.resolver.sourceExts, 'svg', 'css'];

// Cache settings
config.cacheStores = [];

module.exports = withNativeWind(config, { 
  input: './globals.css'
});