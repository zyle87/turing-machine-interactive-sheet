describe('registration', () => {
  it('should register and unregister', () => {
    cy.visit('/')

    cy.get('#name-text-field').type('john doe')
    cy.get('#hash-text-field').type('B62 0GL M').blur()

    cy.get('#registration').matchImageSnapshot('should register')

    cy.get('#name-text-field__delete-button').click()
    cy.get('#hash-text-field__delete-button').click()

    cy.get('#registration').matchImageSnapshot('should unregister')
  })
})
