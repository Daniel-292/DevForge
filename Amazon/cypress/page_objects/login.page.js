class Login{
    get emailInput() {return cy.get('[name="username"]')};
    get continueButtton() {return cy.get('[type="submit"]')};
    get passwordInput() {return cy.get('[name="password"]')};
    get loginWithGoogleButton() {return cy.get('[class="btn btn-lwg btn-block mt-3 mb-2"]')};
    get loginbotton() {return cy.get('[class="btn btn-main btn btn-default btn-block"]')};
    get verificationCodeInput() {return cy.get('[id="verificationFormCodeInputField"]')};
    get submitButton() {return cy.get('[class="btn btn-main btn btn-default btn-block"]')};
}

export default new Login();