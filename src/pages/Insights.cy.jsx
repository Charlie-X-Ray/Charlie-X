import Insights from './Insights'

describe('<Insights />', () => {
  beforeEach('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Insights />)
  })

  it.only('contains title', () => {
    cy.contains('Insights')
  })

  it.only('defaults to hide xrays', () => {
    cy.root().should('not.have', '[data-test="ogxray"]')
    cy.root().should('not.have', '[data-test="mlxray"]')
  })

  it.only('has uploadable xray input', () => {
    const exampleFile = 'xrays/0a14aeaf02d42990d8bb5d55270b7274.png'
    cy.get('input[type=file]')
      .should('have.attr', 'data-test', "xrayinput")
      .as('fileinput')
    
    cy.get('@fileinput')
      .selectFile(exampleFile)
  })

  it.only('shows original xray', () => {
    const exampleFile = 'xrays/0a14aeaf02d42990d8bb5d55270b7274.png'
    cy.get('input[type=file]')
      .should('have.attr', 'data-test', "xrayinput")
      .as('fileinput')
      .selectFile(exampleFile)
    
    cy.get('[data-test="ogxray"]')
  })
})