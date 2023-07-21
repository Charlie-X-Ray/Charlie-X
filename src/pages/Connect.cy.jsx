import React from 'react'
import Connect from './Connect'

describe('<Connect />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Connect />)
  })
})