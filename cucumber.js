module.exports = {
    default: {
        paths: ["./functional-tests/features"],
        dryRun: false,
      require: [
            "./functional-tests/step-definitions/**/*.js"
        ],
        format: [
            "progress-bar",
            "summary",
            "json:reports/reports/report.json",
            "html:reports/cucumber-report.html",
            "allure-cucumberjs/reporter"
        ],
        formatOptions: {
            colorsEnabled: true,
            snippetInterface: "async-await",
            resultsDir: "reports/allure-results"
        }
    }
  
};