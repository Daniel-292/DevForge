class DashboardPage{
    get goToMyApplication() {return cy.get('[href="https://account.amazon.jobs/applicant"]')};
}

export default new DashboardPage();