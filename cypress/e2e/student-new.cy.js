describe('Stuents visits site for the first time', () => {
  const browse = "Browse"
  const learn = 'Learn & Study'
  const connect = "Connect"
  const insights = "Expert Insights"

  const checkOnRoot = () => {
    cy.url()
      .should('not.have.any', ['browse', 'connect', 'learn', 'insights'])
  }

  it.only('Defaults to root and allows visitors to visit all pages', () => {
    cy.visit('localhost:5173')

    checkOnRoot()
    // All buttons exist
    cy.get('[data-test="rootbutton"]')
      .as('buttons')
      .should('contain', browse)
      .and('contain', learn)
      .and('contain', connect)
      .and('contain', insights)
    
    cy.wait(1000)
    cy.get('@buttons')
      .contains(connect)
      .click()
    
    cy.url()
      .should('contain', 'connect')
    
    cy.wait(1000)
    cy.get('[data-test="rootlink"')
      .click()

    checkOnRoot()
    
    cy.wait(1000)
    cy.get('@buttons')
      .contains(insights)
      .click()
    
    cy.url()
      .should('contain', 'insights')
    
    cy.wait(1000)
    cy.get('[data-test="rootlink"')
      .click()

    checkOnRoot()
    
    cy.wait(1000)
    cy.get('@buttons')
      .contains(learn)
      .click()
    
    cy.url()
      .should('contain', 'learn')
    
    cy.wait(1000)
    cy.get('[data-test="rootlink"')
      .click()

    checkOnRoot()
    
    cy.wait(1000)
    cy.get('@buttons')
      .contains(browse)
      .click()
    
    cy.url()
      .should('contain', 'browse')
    
    cy.wait(1000)
    cy.get('[data-test="rootlink"')
      .click()
    
    checkOnRoot()
  })
})