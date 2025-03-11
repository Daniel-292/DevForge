const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://passport.amazon.jobs/', 
    env: {
      userDetailsPage: "https://www.amazon.jobs/en-US/user/details",
      homePage: "https://www.amazon.jobs/en"
    },
    headers: {
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
      "Referer": "https://passport.amazon.jobs",
      "Content-Type": "application/json"
    },
    viewportHeight: 1200,
    viewportWidth: 1400,
    chromeWebSecurity: false, 
    experimentalSessionAndOrigin: true
  },
});