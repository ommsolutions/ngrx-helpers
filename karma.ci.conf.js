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
            reports: ["html", "lcovonly"],
            fixWebpackSourcePaths: true
        },
        angularCli: {
            environment: "dev"
        },
        reporters: config.angularCli && config.angularCli.codeCoverage
            ? ["progress", "coverage-istanbul"]
            : ["progress", "kjhtml"],
        port: 9876,
        colors: false,
        logLevel: config.LOG_DEBUG,
        autoWatch: true,
        browsers: ["Chrome_travis_ci"],
        customLaunchers: {
            Chrome_travis_ci: {
                base: "Chrome",
                flags: ["--no-sandbox"]
            }
        },
        singleRun: true
    });
};