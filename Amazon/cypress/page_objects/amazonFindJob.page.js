class AmazonFindJob{
    // get listButton() {return cy.contains('span', 'list')}
    get shearchInput() {return cy.get('[data-react-class="SearchInput"]')};
    get locationInput() {return cy.get('[class="undefined form-control tt-input"]')};
    get shearchButton() {return cy.get('[id="search-button"]')};
    
}

export default new AmazonFindJob();