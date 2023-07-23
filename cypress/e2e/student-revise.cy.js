describe('Student comes to revise', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/browse')
  })

  it.only('has xrays to see and search', () => {
    const filterString = "ild"
    const negativeString = 'aortic'

    cy.get('[data-test="xrayhero"]')
      .as('xrays')
      .should('have.length.at.least', 10)
    
    cy.get('@xrays')
      .last()
      .as('lastxray')
      .scrollIntoView()

    cy.wait(1000)
    
    cy.get('@lastxray')
      .click()
    
    cy.wait(1000)

    cy.get('[data-test="xraymodal"]')
      .as('xraymodal')
      .should('be.visible')

    cy.get('.chakra-modal__content-container')
      .click('topLeft')
    
    cy.wait(500)
    cy.get('@xraymodal')
      .should('not.exist')
    
    cy.get('[data-test="searchbar"]')
      .as('searchbar')
      .type(filterString)
      .should('have.value', filterString)
    
    cy.wait(1000)
    // Have at least 1 xray
    cy.get('[data-test="xrayhero"]')
      .as('xrays')
      .should('have.length.at.least', 1)
      .and('not.contain.text', negativeString)
    cy.wait(1000)
    
    cy.get('@xrays')
      .first()
      .click()

    cy.wait(1000)
    cy.get('[data-test="xraymodal"]')
      .as('xraymodal')
      .should('be.visible')
    
    cy.get('@xraymodal')
      .contains(filterString, {matchCase:false})
    
    cy.wait(1000)
    cy.get('.chakra-modal__content-container')
      .click('topLeft')
    
    cy.wait(1000)
    cy.get('@xraymodal')
      .should('not.exist')
    
    cy.get('[data-test="learnlink"]')
      .click()
    
    cy.wait(1000)

    cy.url()
      .should('include','/learn')
    
  })
})