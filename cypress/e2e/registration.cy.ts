describe('registration', () => {
  it('should register and clear', () => {
    cy.wrap(
      Cypress.automation('remote:debugger:protocol', {
        command: 'Emulation.setDeviceMetricsOverride',
        params: {
          deviceScaleFactor: 1,
          width: 0,
          height: 0,
          mobile: false,
        },
      })
    )

    cy.visit('/').wait(1000)

    cy.get('#registration__name-text-field').type('john doe')
    cy.get('#registration__hash-text-field').type('B62 0GL M').blur()

    cy.matchImageSnapshot('filled')

    cy.get('#registration__name-text-field__clear-button').click()
    cy.get('#registration__hash-text-field__clear-button').click()

    cy.matchImageSnapshot('cleared')
  })
})
