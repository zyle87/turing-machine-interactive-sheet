describe('registration', () => {
  it('should register and unregister', () => {
    cy.visit('/')

    cy.get('#registration__name-text-field').type('john doe')
    cy.get('#registration__hash-text-field').type('B62 0GL M').blur()

    cy.get('#registration-section').matchImageSnapshot('should register')

    cy.get('#registration__name-text-field__delete-button').click()
    cy.get('#registration__hash-text-field__delete-button').click()

    cy.get('#registration-section').matchImageSnapshot('should unregister')
  })
})
