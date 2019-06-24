const webpack = require('./webpack.config')
module.exports = config => {
    config.set({
        frameworks: ['mocha', 'chai', 'sinon'],
        files: ['test/**/*.js'],
        reporters: ['progress'],
        port: 8080,
        colors: true,
        logLevel: config.LOG_INFO,
        browsers: ['ChromeDebugging'],
        customLaunchers: {
            ChromeDebugging: {
              base: 'Chrome',
              flags: [ '--remote-debugging-port=9333' ]
            }
          },
          singleRun: false,
        autoWatch: false,
        concurrency: Infinity,
        preprocessors: {
            'test/**/*.js': [ 'webpack' ],
            'src/**/*.js': [ 'webpack' ]
        },
        webpack: {
          mode: "development"
        },
        webpackMiddleware: {
          // webpack-dev-middleware configuration
          // i.e.
          noInfo: true,
          // and use stats to turn off verbose output
          stats: {
            // options i.e. 
            chunks: false
          }
        }
    });
}