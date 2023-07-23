import React from 'react'
import LearnStudy from './LearnStudy'

describe('<LearnStudy />', () => {
  beforeEach('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<LearnStudy />)
  })

  it.only('has the page title Learn & Study', () => {
    cy.root().contains('Learn & Study')
  })
})