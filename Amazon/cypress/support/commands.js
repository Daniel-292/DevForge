// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import user from "../fixtures/userCredential.json"
import Mailjs from "@cemalgnlts/mailjs";
import "cypress-wait-until";

Cypress.Commands.add("createTempEmail", () => {
  return cy.wrap(null).then(() => {
    const mailjs = new (require("@cemalgnlts/mailjs"))();
    const maxRetries = 5;
    let attempts = 0;
    function createEmailWithRetry() {
      attempts++;
      cy.log(`🔄 Attempt ${attempts}: Creating a temporary email...`);
      return mailjs.createOneAccount()
        .then((account) => {
          if (account.status && account.data.username) {
            cy.log(`✅ Email created: ${account.data.username}`);
            return {
              email: account.data.username,
              password: account.data.password,
              mailjs,
            };
          } else {
            cy.log(`⚠️ Email creation error: ${account.message || "Unknown error"}`);
            throw new Error("Failed to create an email");
          }
        })
        .catch((error) => {
          cy.log(`❌ Error: ${error.message}`);
          if (attempts >= maxRetries) {
            throw new Error("❌ createTempEmail() failed to create an email after 5 attempts.");
          }
          if (error.message.includes("429")) {
            cy.log("⏳ Request limit reached, waiting 5 seconds...");
            return cy.wait(5000).then(createEmailWithRetry); 
          }
          cy.log("🔁 Retrying in 3 seconds...");
          return cy.wait(3000).then(createEmailWithRetry);
        });
    }
    return createEmailWithRetry();
  });
});

  Cypress.Commands.add("getAuthToken", (email, password) => {
    return cy
      .request("POST", "https://api.mail.tm/token", {
        address: email,
        password: password,
      })
      .then((tokenResponse) => {
        return tokenResponse.body.token;
      });
  });

  Cypress.Commands.add("registerAmazonAccount", (email) => {
    cy.visit("https://passport.amazon.jobs/createaccount");
    cy.get('[name="username"]').type(email);
    cy.get('[name="password"]').type("SecurePass123!");
    cy.get('[name="confirmPassword"]').type("SecurePass123!");
    cy.get('[class="btn btn-main btn btn-default btn-block"]').click();
    cy.log("Waiting for the verification code...");
  });

  Cypress.Commands.add("getVerificationCode", (mailjs) => {
    return cy.wrap(null).then(() => {
      const maxRetries = 10; 
      let attempts = 0;
      return cy.waitUntil(
        () => {
          attempts++;
          cy.log(`🔄 Attempt ${attempts}: Checking for email...`);
          return mailjs.getMessages().then((messagesResponse) => {
            if (!messagesResponse.status || messagesResponse.data.length === 0) {
              cy.log(`⏳ Email has not arrived yet, waiting...`);
              return false; 
            }
            const latestMessageId = messagesResponse.data[0].id;
            cy.log(`📩 Email found! ID: ${latestMessageId}`);
            return mailjs.getMessage(latestMessageId).then((message) => {
              cy.log("📨 Email content:", message.data);
              let emailText = message.data.text || "";
              if (!emailText && message.data.html) {
                emailText = message.data.html.join(" ");
              }
              if (!emailText) {
                cy.log(`⚠️ Email found, but it is empty. Trying again...`);
                return false; 
              }
              const match = emailText.match(/\d{6}/);
              if (!match) {
                throw new Error("❌ Verification code not found in the email.");
              }
              cy.log(`✅ Verification code found: ${match[0]}`);
              return match[0]; 
            });
          });
        },
        { timeout: 30000, interval: 3000 } 
      );
    });
  });
  
  Cypress.Commands.add("erroHandler", () => {
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });
  });