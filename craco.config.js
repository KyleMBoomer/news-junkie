const path = require('path-browserify');
const streamHttp = require('stream-http');

module.exports = {
  webpack: {
    resolve: {
      fallback: {
        "path": path,
        "http": streamHttp,
        "https": require.resolve("https-browserify"),
        "os": require.resolve("os-browserify/browser"),
        "url": require.resolve("url/"),
      },
    },
  },
};
