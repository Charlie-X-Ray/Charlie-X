import Connect from './Connect'

describe('<Connect />', () => {
  beforeEach('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Connect />)
  })
  it.only('contains information about Ryan', () => {
    cy.get('[data-test="personalinfo"]')
      .contains('Ryan')
      .should('have.length', 1)
      .as('info')
    
    cy.get('@info')
  })

  it.only('contains information about Drustan', () => {
    cy.get('[data-test="personalinfo"]')
      .contains('Drustan')
      .should('have.length', 1)
      .as('info')
    
    cy.get('@info')
  })
})