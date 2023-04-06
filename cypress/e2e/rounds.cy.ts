describe('rounds', () => {
  it('should add a round and undo it', () => {
    cy.viewport(640, 777)
    cy.visit('/')

    cy.get('#rounds-section').matchImageSnapshot('pristine')

    cy.get('#rounds__add-round-button').click().blur()

    cy.get('#rounds-section').matchImageSnapshot('with 1 empty round')

    cy.get('#rounds__delete-round-1-button').click()

    cy.get('#rounds-section').matchImageSnapshot('cleared')
  })
})
