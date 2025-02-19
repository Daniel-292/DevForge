class Login{
    get emailInput() {return cy.get('[name="email"]')};
    get continueButtton() {return cy.get('[type="submit"]')};
    get passwordInput() {return cy.get('[name="password"]')};
}

export default new Login();