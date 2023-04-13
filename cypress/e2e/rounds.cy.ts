describe('rounds', () => {
  it('should add 2 rounds, fill the first one, undo the second one and clear all', () => {
    cy.visit('/').wait(1000)

    cy.get('#rounds__add-round-button').click()
    cy.get('#rounds__add-round-button').click()

    cy.get('#rounds__round-1-triangle-text-field').type('1')
    cy.get('#rounds__round-1-square-text-field').type('3')
    cy.get('#rounds__round-1-circle-text-field').type('5')

    cy.get('#rounds__round-1-verifier-a-button').click()
    cy.get('#rounds__round-1-verifier-c-button').click()
    cy.get('#rounds__round-1-verifier-c-button').click()
    cy.get('#rounds__round-1-verifier-e-button').click().blur()

    cy.get('#rounds-section').matchImageSnapshot(
      'rounds with 1 filled and 1 empty'
    )

    cy.get('#rounds__round-2-undo-button').click()

    cy.get('#rounds-section').matchImageSnapshot('rounds with 1 filled only')

    cy.get('#rounds__clear-button').click().blur()

    cy.get('#rounds-section').matchImageSnapshot('rounds cleared')
  })
})
