// Karma configuration
// Generated on Mon Oct 02 2017 12:36:03 GMT+0400 (Кавказское время (зима))

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],
    plugins: [
      require('karma-jasmine'),
      require('karma-phantomjs-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-junit-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('karma-ng-html2js-preprocessor'),
    ],
    client:{
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      reports: [ 'html', 'lcovonly' ],
      fixWebpackSourcePaths: true
    },

    reporters: ['progress', 'kjhtml', 'dots', 'junit'],
    junitReporter: { outputFile: '../test-results.xml'},

    // list of files / patterns to load in the browser
    files: [
    "node_modules/angular/angular.js",
    "node_modules/chart.js/dist/Chart.bundle.min.js",
    "node_modules/angular-chart.js/angular-chart.js",
    "bower_components/angular-sanitize/angular-sanitize.min.js",
    "node_modules/moment/moment.js",
    "node_modules/angular-cookies/angular-cookies.min.js",
    "node_modules/angular-messages/angular-messages.min.js",
    "node_modules/angular-mocks/angular-mocks.js",
    "bower_components/angular-translate/angular-translate.min.js",
    "bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.min.js",
    "node_modules/angular-ui-router/release/angular-ui-router.min.js",
    "node_modules/angular-ui-grid/ui-grid.min.js",
    "node_modules/v-accordion/dist/v-accordion.min.js",
    "node_modules/angular-animate/angular-animate.min.js",
    "bower_components/angular-timer/dist/angular-timer.min.js",
    "bower_components/humanize-duration/humanize-duration.js",
    "./bower_components/mathjs/dist/math.min.js",
    "src/**/*.html",
    "src/js/app.js",
    "src/js/scripts/*.js",
    "src/js/scripts/js-components/*.js",
    "src/js/scripts/apps/*.js",
    "src/js/scripts/forms/*.js",
    "src/js/xpro.constants.js",
    "src/js/controllers/*.js",
    "src/js/services/*.js",
    "src/js/interceptors/*.js",
    "src/unit/*.js"
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'src/**/*.html': ['ng-html2js']
    },


    ngHtml2JsPreprocessor: {
      stripPrefix: 'src/',
      moduleName: 'myAppTemplates'
    },

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  });
};

