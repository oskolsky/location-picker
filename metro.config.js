const { getDefaultConfig } = require('expo/metro-config')

const config = getDefaultConfig(__dirname)

// --- SVG support ---
config.transformer.babelTransformerPath = require.resolve('react-native-svg-transformer')
config.resolver.assetExts = config.resolver.assetExts.filter(ext => ext !== 'svg')
config.resolver.sourceExts = [...config.resolver.sourceExts, 'svg']

// --- Alias ---
config.resolver.extraNodeModules = {
    '@': __dirname,
}

module.exports = config
