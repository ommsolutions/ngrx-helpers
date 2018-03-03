// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
    config.set({
        basePath: "",
        frameworks: ["jasmine", "@angular/cli"],
        plugins: [
            require("karma-jasmine"),
            require("karma-chrome-launcher"),
            require("karma-jasmine-html-reporter"),
            require("karma-coverage-istanbul-reporter"),
            require("@angular/cli/plugins/karma")
        ],
        coverageIstanbulReporter: {
            reports: ["lcovonly"],
            fixWebpackSourcePaths: true
        },
        angularCli: {
            environment: "dev"
        },
        reporters: ["progress", "coverage-istanbul"],
        port: 9876,
        colors: false,
        logLevel: config.LOG_DEBUG,
        autoWatch: true,
        browsers: ["ChromeHeadlessNoSandbox"],
        customLaunchers: {
            ChromeHeadlessNoSandbox: {
                base: "ChromeHeadless",
                flags: ["--no-sandbox"]
            }
        },
        singleRun: true
    });
};
