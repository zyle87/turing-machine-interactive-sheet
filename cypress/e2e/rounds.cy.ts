describe('rounds', () => {
  it('should add a round and undo it', () => {
    cy.visit('/')

    cy.get('#rounds-section').matchImageSnapshot('rounds/pristine')

    cy.get('#rounds__add-round-button').click().blur()

    cy.get('#rounds-section').matchImageSnapshot('rounds/with 1 empty round')

    cy.get('#rounds__delete-round-1-button').click()

    cy.get('#rounds-section').matchImageSnapshot('rounds/cleared')
  })
})
