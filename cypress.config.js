const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://coffee-cart.app',
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      reportDir: 'cypress/reports/',
      overwrite: false,
      html: true,
      json: true
    },
  },
});
