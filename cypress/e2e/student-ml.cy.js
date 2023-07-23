describe('Student visits site to try ml', () => {

  const submitAndRecieveOutput = () => {
    cy.get('[data-test="xraysubmit"]')
      .click()
    
    cy.get('[data-test="loadingicon"]')
      .as('loadingicon')
      .should('be.visible')
    
    cy.get('[data-test="mlxray"]', {timeout:15000})
      .should('be.visible')
    
    cy.get('@loadingicon')
      .should('not.be.visible')
  }

  it.only('Allows studnets to upload and receive ml images', () => {
    const insights = 'Expert Insights'
    const exampleFile = 'xrays/0622cd29e4e0e4f198abf15614819ae8.png'
    const exampleFile2 = 'xrays/051132a778e61a86eb147c7c6f564dfe.png'
    cy.visit("localhost:5173")

    cy.wait(1000)
    cy.get('[data-test="rootbutton"]')
      .contains(insights)
      .click()

    cy.wait(1000)
    cy.get('input[type=file]')
      .should('have.attr', 'data-test', "xrayinput")
      .as('fileinput')
    
    cy.get('@fileinput')
      .selectFile(exampleFile, {force:true})
    
    cy.wait(1000)
    submitAndRecieveOutput()

    cy.wait(1000)
    cy.get('@fileinput')
      .selectFile(exampleFile2)
    
    cy.root()
      .should('not.have', '[data-test="mlxray"]')

    cy.wait(1000)
    submitAndRecieveOutput()
  })
})