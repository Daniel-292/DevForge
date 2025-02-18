const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.amazon.jobs/en/', 
    viewportHeight: 1400,
    viewportWidth: 1200,
  },
});