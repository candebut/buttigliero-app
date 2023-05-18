import React from 'react'
import Pokedex from './Pokedex'

describe('<Pokedex />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Pokedex />)
  })
})