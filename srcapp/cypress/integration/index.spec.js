describe('index page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('contains title and meta description content', () => {
    cy.title().should('eq', 'Enframe Example Todo App')
    cy.get('head meta[name="description"]').should(
      'have.attr',
      'content',
      'Enframe example todo app.'
    )
  })

  it('displays welcome text', () => {
    cy.get('h1').contains('Example Todo App')
  })
})
