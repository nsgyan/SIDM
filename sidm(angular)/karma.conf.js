// // Karma configuration file, see link for more information
// // https://karma-runner.github.io/1.0/config/configuration-file.html

// module.exports = function (config) {
//   config.set({
//     basePath: '',
//     frameworks: ['jasmine', '@angular-devkit/build-angular'],
//     plugins: [
//       require('karma-jasmine'),
//       require('karma-chrome-launcher'),
//       require('karma-jasmine-html-reporter'),
//       require('karma-coverage'),
//       require('@angular-devkit/build-angular/plugins/karma')
//     ],
//     client: {
//       jasmine: {
//         // you can add configuration options for Jasmine here
//         // the possible options are listed at https://jasmine.github.io/api/edge/Configuration.html
//         // for example, you can disable the random execution with `random: false`
//         // or set a specific seed with `seed: 4321`
//       },
//       clearContext: false // leave Jasmine Spec Runner output visible in browser
//     },
//     jasmineHtmlReporter: {
//       suppressAll: true // removes the duplicated traces
//     },
//     coverageReporter: {
//       dir: require('path').join(__dirname, './coverage/sidm'),
//       subdir: '.',
//       reporters: [
//         { type: 'html' },
//         { type: 'text-summary' }
//       ]
//     },
//     reporters: ['progress', 'kjhtml'],
//     port: 9876,
//     colors: true,
//     logLevel: config.LOG_INFO,
//     autoWatch: true,
//     browsers: ['Chrome'],
//     singleRun: false,
//     restartOnFileChange: true
//   });
// };
// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    files: [

    ],
    preprocessors: {

    },
    mime: {
      'text/x-typescript': ['ts', 'tsx']
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, 'coverage'), reports: ['html', 'lcovonly'],
      fixWebpackSourcePaths: true
    },
    angularCli: {
      environment: 'dev'
    },
    reporters: config.angularCli && config.angularCli.codeCoverage
      ? ['progress', 'coverage-istanbul']
      : ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false
  });
};
