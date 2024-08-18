// const webpack = require('webpack');

// module.exports = {
//   webpack: {
//     configure: (webpackConfig) => {
//       webpackConfig.resolve.fallback = {
//         fs: false,
//         http: require.resolve('stream-http'),
//         https: require.resolve('https-browserify'),
//         path: require.resolve('path-browserify'),
//         os: require.resolve('os-browserify/browser'),
//         stream: require.resolve('stream-browserify'),
//       };
//       webpackConfig.plugins.push(
//         new webpack.ProvidePlugin({
//           process: 'process/browser',
//           Buffer: ['buffer', 'Buffer'],
//         })
//       );
//       return webpackConfig;
//     },
//   },
// };
