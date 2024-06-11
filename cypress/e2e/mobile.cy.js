describe('Responsive design on mobile device', () => {
    it('should display correctly the menu on a mobile device', () => {
      cy.viewport('iphone-6');
      cy.visit('/');
  
      // Check if the main elements are visible and properly aligned
      cy.get('[href="/"]').should('be.visible');
      cy.get('[href="/cart"]').should('be.visible');
      cy.get('[href="/github"]').should('be.visible');
      cy.get('[data-test="checkout"]').should('be.visible');
    });
  
    it('should display correctly the cart on a mobile device', () => {
      cy.viewport('iphone-6');
      cy.visit('/');
      cy.get('[href="/cart"]').click();
      cy.contains('No coffee, go add some.').should('be.visible');
    });
  });
  