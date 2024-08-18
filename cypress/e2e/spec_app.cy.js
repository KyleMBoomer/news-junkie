describe('Article Component', () => {
  let api, url
  beforeEach(() => {
    api = 'https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=3a1e8f4ba6344f418814ed61b6dd9307'
    url = 'http://localhost:3000/'
    cy.intercept('GET', api, { fixture: 'example.json' }).as('getArticles')
    cy.visit(url)
    cy.wait('@getArticles')
  })

  it('should display a list of articles with headlines, images, descriptions, and dates', () => {
    cy.get('.glide').should('exist');
    cy.wait(1000);
    cy.get('.glide__slide:not(.glide__slide--clone)').should('have.length', 2);

    cy.get('.glide__slide:not(.glide__slide--clone)').eq(0).within(() => {
      cy.get('h2').should('contain.text', "Bye-bye bots: Altera's game-playing AI agents get backing from Eric Schmidt | TechCrunch");
      cy.get('img').should('have.attr', 'src', 'https://techcrunch.com/wp-content/uploads/2024/05/Minecraft-keyart.jpg?resize=1200,720');
      cy.get('p').eq(0).should('contain.text', 'Autonomous, AI-based players are coming to a gaming experience near you...');
      cy.get('p').eq(1).should('contain.text', '5/8/2024');
    });

    cy.get('.glide__slide:not(.glide__slide--clone)').eq(1).within(() => {
      cy.get('h2').should('contain.text', '$450M for Noname, two billion-dollar rounds, and good news for crypto startups | TechCrunch');
      cy.get('img').should('have.attr', 'src', 'https://techcrunch.com/wp-content/uploads/2023/07/GettyImages-942480316.jpg?resize=1200,835');
      cy.get('p').eq(0).should('contain.text', 'This morning on Equity, not only do we have good news for crypto founders...');
      cy.get('p').eq(1).should('contain.text', '5/8/2024');
    });
  });

  it('should navigate to a detailed view when an article is clicked', () => {
    cy.wait(1000)
    cy.get('.glide__slide:not(.glide__slide--clone)').eq(0).scrollIntoView().click({ force: true });
    cy.url().should('include', '/article/Bye-bye%20bots:%20Altera\'s%20game-playing%20AI%20agents%20get%20backing%20from%20Eric%20Schmidt%20%7C%20TechCrunch');
    ;
    cy.get('h2').should('contain.text', "Bye-bye bots: Altera's game-playing AI agents get backing from Eric Schmidt | TechCrunch");
    cy.get('img').should('have.attr', 'src', 'https://techcrunch.com/wp-content/uploads/2024/05/Minecraft-keyart.jpg?resize=1200,720');
    cy.get('p').eq(0).should('contain.text', 'Source:TechCrunch');
    cy.get('p').eq(1).should('contain.text', 'Date:5/8/2024');
  });

  it('should sort articles correctly when sorting options are changed', () => {
    cy.get('#sort').select('Oldest First');
    cy.wait('@getArticles');
    cy.wait(2000)

    cy.get('.glide__slide:not(.glide__slide--clone)').eq(0).within(() => {
      cy.get('h2').should('contain.text', `Bye-bye bots: Altera's game-playing AI agents get backing from Eric Schmidt | TechCrunch`);
    });
  });
})