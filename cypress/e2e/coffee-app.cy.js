describe('Add selection from Menu', () => {
    it('should increase the total amount when Espresso is clicked', () => {
      cy.visit('/');
      cy.get('[data-test="checkout"]').then(($button) => {
        const initialTotal = parseFloat($button.text().replace('Total: $', ''));
        cy.get('[data-cy="Espresso"]').click();
  
        // Check that the total amount has increased
        cy.get('[data-test="checkout"]').should(($newButton) => {
          const newTotal = parseFloat($newButton.text().replace('Total: $', ''));
          expect(newTotal).to.be.greaterThan(initialTotal);
        });
      });
    });
  
    it('should add an item to the cart by right-clicking', () => {
      cy.visit('/');
      cy.get('[data-cy="Espresso"]').rightclick();
      cy.contains('button', 'Yes').should('be.visible').click();
      cy.get('a[aria-label="Cart page"]').should('contain', 'cart (1)');
    });
  });
  
  describe('Applying promotion', () => {
    it('should apply promotion and display a new dialog', () => {
      cy.visit('/');
      cy.get('[data-cy="Espresso"]').dblclick();
      cy.get('[data-cy="Espresso"]').click();
  
      // Check if the promotion is applied after selecting the product three times
      cy.get('.promo').should('be.visible');
      cy.get('.yes').click();
      cy.get('a[aria-label="Cart page"]').should('contain', 'cart (4)');
    });
  });
  
  describe('Shopping cart tests', () => {
    it('should add items from the cart', () => {
      cy.visit('/');
      cy.get('[data-cy="Espresso"]').click();
      cy.get('[href="/cart"]').click();
  
      cy.get('[data-test="checkout"]').then(($button) => {
        const initialTotal = parseFloat($button.text().replace('Total: $', ''));
        cy.get('button:contains("+")').eq(1).click();
  
        // Check that the total amount has increased
        cy.get('[data-test="checkout"]').should(($newButton) => {
          const newTotal = parseFloat($newButton.text().replace('Total: $', ''));
          expect(newTotal).to.be.greaterThan(initialTotal);
        });
      });
    });
  
    it('should remove all items from the cart', () => {
      cy.visit('/');
      cy.get('[data-cy="Espresso"]').click();
      cy.get('[href="/cart"]').click();
      cy.get('.delete').click();
  
      // Check if the cart is empty after removing all items
      cy.contains('No coffee, go add some.').should('be.visible');
    });
  });
  
  describe('Complete an order', () => {
    function generateRandomString(length) {
      return Math.random().toString(36).substring(2, 2 + length);
    }
  
    it('should complete the order after filling in the form', () => {
      const randomName = generateRandomString(8) + ' ' + generateRandomString(5);
      const randomEmail = generateRandomString(10) + '@example.com';
  
      cy.visit('/');
      cy.get('[data-cy="Espresso"]').click();
      cy.get('[data-test="checkout"]').click();
  
      // Wait for the dialog to appear and fill in the form
      cy.get('form[aria-label="Payment form"]').should('be.visible');
      cy.get('input[id="name"]').type(randomName);
      cy.get('input[id="email"]').type(randomEmail);
  
      cy.get('#submit-payment').click();
      cy.get('.snackbar').should('be.visible'); // Check for confirmation message
    });
  });
  
  