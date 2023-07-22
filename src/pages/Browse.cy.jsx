import React from 'react'
import Browse from './Browse'

describe('<Browse />', () => {
  const timeout = 30000
  beforeEach('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Browse />)
  })
  it.only('has the page title Browse', () => {
    cy.root().contains('Browse')
  })

  it.only('displays at least 10 xrays', () => {
    // Should find condition names
    cy.get('[data-test="xrayhero"]', {timeout: timeout})
      .should('have.length.at.least', 10)

  })
  it.only('has a usable search bar for filtering', () => {
    const searchStr = "cardio"
    const negativeSearchStr = "ILD"
    cy.get('[data-test="xrayhero"]', {timeout: timeout})
      .should('have.length.at.least', 10)

    cy.get('[data-test="searchbar"]')
      .as('searchBar')
      .type(searchStr)
      .should('have.value', searchStr)
    
    cy.get('@searchBar')
      .should('have.focus')

    cy.get('[data-test="xrayhero"]', {timeout: timeout})
      .as('xrays')
      .should('not.have', negativeSearchStr)
  })
  it.only('has modal x rays', () => {
    cy.get('[data-test="xrayhero"]')
      .first()
      .click()
  })
})