describe('Browsing x-rays', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/browse')
  })

  it('displays at least 10 xrays', () => {
    // Should find condition names
    cy.get('[data-test="xrayhero"]')
      .should('have.length.at.least', 10)

  })
  it('has a usable search bar', () => {
    const searchStr = "aortic enlargement"
    const negativeSearchStr = "cardiomegaly"

    cy.get('[data-test="searchbar"]')
      .as('searchBar')
      .type(searchStr)
      .should('have.value', searchStr)

    cy.get('[data-test="xrayhero"]')
      .should('not.have.text', negativeSearchStr)

  })
})