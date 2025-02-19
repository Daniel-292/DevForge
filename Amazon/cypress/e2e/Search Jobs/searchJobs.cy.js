import amazonFindJobPage from "../../page_objects/amazonFindJob.page"
import resultOfShearchPage from "../../page_objects/resultOfShearch.page"
import user from "../../fixtures/userCredential.json"
import jobDescriptionPage from "../../page_objects/jobDescription.page"
import loginPage from "../../page_objects/login.page"
const password = user.password;
const email = user.email

describe('Find Jobs', () => {
    beforeEach(() => {
      cy.visit('/')
    })

    it('Should find job and fill out the form', () => {
      amazonFindJobPage.dropdownMenuLink.click();
      amazonFindJobPage.myProfileButton.click();
      cy.origin('https://passport.amazon.jobs', { args: { email, password } }, ({ email, password }) => {
        cy.get('[href="/"]').click();
        cy.get('[name="username"]').type(email)
         cy.get('[name="password"]').type(password);
         cy.wait(5000)
         cy.get('[class="btn btn-main btn btn-default btn-block"]').click();
         cy.wait(5000)
      })
    //  amazonFindJobPage.shearchInput.type(user.job);
    //  amazonFindJobPage.shearchButton.click();
    //  resultOfShearchPage.industryExperienceFilter.contains('1-3 years').click();
    //  resultOfShearchPage.fullTimeJobButton.click();
    //  resultOfShearchPage.jobCategoryQualityEngineeringButton.click();
    //  resultOfShearchPage.countryUnitedStatesButton.click();
    //  resultOfShearchPage.jobTitle.contains('Quality Assurance Engineer, FireTV').click();
    //  jobDescriptionPage.applyNowButton.click();
    //  loginPage.emailInput.type(user.email);
    //  loginPage.continueButtton.click();
    //  cy.origin('https://passport.amazon.jobs', { args: { password } }, ({  password }) => {
    //   cy.get('[name="password"]').type(password);
    //   cy.get('[class="btn btn-main btn btn-default btn-block"]').click();
    // });
     })

    }) 