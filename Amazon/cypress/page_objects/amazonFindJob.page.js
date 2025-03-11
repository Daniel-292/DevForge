class AmazonFindJobPage{
    get searchInput() {return cy.get('[data-react-class="SearchInput"]')};
    get locationInput() {return cy.get('[class="undefined form-control tt-input"]')};
    get searchButton() {return cy.get('[id="search-button"]')};
    get dropdownMenuLink() {return cy.get('[id="dropdownMenuLink"]')};
    get myProfileButton() {return cy.get('[class="dropdown-item"][href="/user/details"]')};
    get myApplication() {return cy.get('[class="dropdown-item"][href="/applicant/dashboard/applications"]')};  
}

export default new AmazonFindJobPage();