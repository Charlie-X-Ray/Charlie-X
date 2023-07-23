// import React from 'react'
import Root from './Root'

describe('<Root />', () => {
  beforeEach('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Root />)
  })

  it.only('has all buttons', () => {
    const buttonNames = [
      "Browse",
      "Learn & Study",
      "Expert Insights",
      "Connect"
    ]
    cy.get('[data-test="rootbutton"]')
      .as('buttons')
      .should(($b) => {
        buttonNames.forEach(name => {
          expect($b).contain(name)
        })
      })
  })

  it.only('Should have title', () => {
    cy.contains('Charlie X')
  })

  it.only('Should load welcome text', () => {
    cy.contains(/Revolutionise how You Learn Radiology/)
  })

  it.only('Should load welcome subtitle', () => {
    cy.get('[data-test="root-subtitle"]')
  })
})