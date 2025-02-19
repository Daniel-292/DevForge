class ResultOfShearchPage{
    get industryExperienceFilter() {return cy.get('[id="desktopFilter_industry_experience_filter"]')};
    get fullTimeJobButton() {return cy.get('[name="desktopFilter_job_type"]')};
    get jobCategoryQualityEngineeringButton() {return cy.get('[name*="desktopFilter"][data-label="Systems, Quality, & Security Engineering"]')};
    get countryUnitedStatesButton() {return cy.get('[name*="desktopFilter"][data-label="United States"]')};
    get jobTitle() {return cy.get('[class="job-title"]')};

}

export default new ResultOfShearchPage();