import amazonFindJobPage from "../../page_objects/amazonFindJob.page";
import resultOfShearchPage from "../../page_objects/resultOfShearch.page";
import user from "../../fixtures/userCredential.json";
import jobDescriptionPage from "../../page_objects/jobDescription.page";
import loginPage from "../../page_objects/login.page";
import applyPage from "../../page_objects/apply.page";
import dashboardPage from "../../page_objects/dashboard.page";

const today = new Date();
const todayDate = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');

describe("Find and Apply Jobs", () => {
  beforeEach(() => {
    cy.erroHandler();
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit("/");
  });

  it("Should find job and fill out the form", () => {
    cy.createTempEmail().then(({ email, mailjs }) => {
      cy.log(`Temporary email created: ${email}`);
      cy.registerAmazonAccount(email);
      cy.getVerificationCode(mailjs ).then((code) => {
        cy.log(`Verification code: ${code}`)
        cy.get('[id="verificationFormCodeInputField"]').type(code);
        cy.get('[class="btn btn-main btn btn-default btn-block"]').click();
      });
    });
  dashboardPage.goToMyApplication.click();
    cy.visit(Cypress.env("userDetailsPage"));
    cy.visit(Cypress.env("homePage"));
    amazonFindJobPage.searchInput.type(user.job);
    amazonFindJobPage.searchButton.click();
    resultOfShearchPage.industryExperienceFilter.contains("1-3 years").click();
    resultOfShearchPage.fullTimeJobButton.click();
    resultOfShearchPage.jobCategoryQualityEngineeringButton.click();
    resultOfShearchPage.countryUnitedStatesButton.click();
    resultOfShearchPage.jobTitle.contains("Quality Assurance Engineer, FireTV").click();
    jobDescriptionPage.applyNowButton.click();
    applyPage.firstNameInput.type(user.firstName);
    applyPage.lastNameInput.type(user.lastName);
    applyPage.phoneNumberInput.type(user.phoneNumber);
    applyPage.addressInput.type(user.address);
    applyPage.cityInput.type(user.city);
    applyPage.zipCodeInput.type(user.zipCode);
    applyPage.selectCountryMenu.click();
    applyPage.listOfCountries.contains(user.country).click();
    applyPage.selectStateMenu.click();
    applyPage.listOfStates.contains('Georgia').click();
    applyPage.saveAndContinueButton.click();
    applyPage.skipAndContinueButton.should('be.visible').click();
    applyPage.readyToRealocate.contains('Yes').click();
    applyPage.howDidYouHearDropdown.click();
    applyPage.howDidYouHearResultsList.contains('Amazon Career Site').click();
    applyPage.amazonCareerSpecifyField.scrollIntoView().type('{enter}');
    applyPage.ifAmazonjobsSpecifyOption.contains('Amazon.jobs').type('{enter}');
    applyPage.continueButton.click();
    applyPage.educationLevelMenu.click();
    applyPage.listOfDegreOption.contains("Associate's").type('{enter}');
    applyPage.schoolNameMenu.click();
    applyPage.firstSchoolNameInput.type('QWE');
    applyPage.otherOption.click();
    applyPage.secondSchoolNameInput.type(user.schoolName);
    applyPage.areaOfStudyInput.type(user.areaOfStudy);
    applyPage.areCurentlyStudentCheckBox.contains('No').click();
    applyPage.graduateMoreThanThreeYearsAgoCheckBox.click();
    applyPage.dontHaveThreeYearsExperienceCheckBox.click();
    cy.intercept('POST', '**/apply/forms/save').as('formSave');
    applyPage.continueButton.click();
    cy.wait('@formSave');
    applyPage.firstJobSpecificQuestion.click();
    applyPage.jobSpecificAnswer.contains('Yes').trigger('mouseover').trigger('mousedown').trigger('mouseup');
    applyPage.secondJobSpecificQuestion.should('be.visible').click().click();
    applyPage.jobSpecificAnswer.contains('No').trigger('mouseover').trigger('mousedown').trigger('mouseup');
    applyPage.thirdJobSpecificQuestion.should('be.visible').click().click().click();
    applyPage.jobSpecificAnswer.contains('Yes').trigger('mouseover').trigger('mousedown').trigger('mouseup');
    applyPage.fourthJobSpecificQuestion.should('be.visible').click().click().click();
    applyPage.jobSpecificAnswer.contains('Yes').trigger('mouseover').trigger('mousedown').trigger('mouseup');
    applyPage.fifthJobSpecificQuestion.should('be.visible').click().click().click();
    applyPage.jobSpecificAnswer.contains('Yes').trigger('mouseover').trigger('mousedown').trigger('mouseup');
    applyPage.sixthJobSpecificQuestion.should('be.visible').click().click().click();
    applyPage.jobSpecificAnswer.contains('Yes').trigger('mouseover').trigger('mousedown').trigger('mouseup');
    applyPage.seventhJobSpecificQuestion.should('be.visible').click().click().click();
    applyPage.jobSpecificAnswer.contains('Yes').trigger('mouseover').trigger('mousedown').trigger('mouseup');
    applyPage.continueButton.click();
    applyPage.appliedToAmazonNoCheckBox.click({ force: true });
    applyPage.beenEmployedByAmazonNoCheckBox.click({ force: true });
    applyPage.competitionAgreementStatusNoCheckBox.click({ force: true });
    applyPage.eligibleToBeginEmploymentYesCheckBox.click({ force: true });
    applyPage.requireSponsorchipNoChechBox.click({ force: true });
    applyPage.backgroundLastSevenYearsYesCheckBox.click({ force: true });
    applyPage.backgroundCheckCountriesLabel.click().should('be.exist');
    applyPage.backgroundCountriesList.contains(user.backgroundCountry).trigger('mouseover').trigger('mousedown').trigger('mouseup');
    applyPage.governmentEmployeeNoCheckBox.click({ force: true });
    applyPage.deemedExportDoYouResideInNoCheckBox.click({ force: true });
    applyPage.yourCitizenshipLabel.click();
    applyPage.citizenshipCountryList.contains(user.curentCitizenship).click();
    applyPage.becomePermanentResidentNoCheckBox.click({ force: true });
    applyPage.continueButton.click();
    applyPage.uploadResume.selectFile('cypress/fixtures/Resume.docx', { force: true });
    applyPage.continueAndSaveButton.should('be.visible').click();
    applyPage.confirmAcknowledgeAboveCheckBox.click({ force: true });
    applyPage.continueButton.click();
    applyPage.maleGenderCheckBox.click({ force: true });
    applyPage.whiteRaceCheckBox.click({ force: true });
    applyPage.continueButton.click();
    applyPage.disabilityNoCheckBox.click({ force: true });
    applyPage.yourNameInput.type(user.firstName);
    applyPage.todaysDateInput.type(todayDate);
    applyPage.handwrittenSignatureCheckBox
      .find('input[type="checkbox"].custom-control-input')
      .should('exist')
      .and('not.be.checked')
      .click({ force: true });
    applyPage.continueButton.click();
    applyPage.areYouVeteranNoCheckBox.click({ force: true });
    applyPage.memberOfReservesNoCheckBox.click({ force: true });
    applyPage.miliyaryRecordSpouseNoCheckBox.click({ force: true });
    applyPage.protectedVeteranNoCheckBox.click({ force: true });
    applyPage.continueButton.click();
    
    applyPage.contactInformationForm.should('contain', user.firstName)
    .should('contain', user.lastName)
    .should('contain', user.phoneNumber)
    .should('contain', user.address)
    .should('contain', user.city)
    .should('contain', user.location)
    .should('contain', user.zipCode)
    .should('contain', user.country)
  });
})
