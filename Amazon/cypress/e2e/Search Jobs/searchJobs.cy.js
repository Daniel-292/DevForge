import amazonFindJobPage from "../../page_objects/amazonFindJob.page"
import user from "../../fixtures/userCredential.json"

describe('Find Jobs', () => {
    beforeEach(() => {
      cy.visit('/')
    })

    it('Should find job and fill out the form', () => {
     amazonFindJobPage.shearchInput.type(user.job);
     amazonFindJobPage.locationInput.type(user.location);
     amazonFindJobPage.shearchButton.click();
    }) 
})