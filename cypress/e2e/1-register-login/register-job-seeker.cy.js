const input = Cypress.env('dev');
let lang = Cypress.env('LANGUAGE') || 'idn';

describe('Register to Dealls', () => {
    beforeEach(() => {
        cy.clearAllCookies();
        cy.clearAllLocalStorage();
        cy.fixture('talent_job_seeker').then((data) => {
            
        });
        cy.visit(`${input.url}/mentoring`);
        cy.get('html').should('have.attr', 'lang').then((language) => {
            cy.log(`${language}`);
            lang = language === 'id' ? 'idn' : 'en';
        });
        cy.xpath(`//a[normalize-space()='${input[lang].signup}']`).click();
    });

    describe(`Register as a Job Seeker`, () => {
        it('1st step', () => {
            cy.url().should('include', '/sign-up');
            cy.xpath(`//div[@class="!px-4 mt-6 flex flex-row flex-wrap items-start justify-center gap-4 md:gap-[42px]"]/div[1]//a`).click();
        })
    });

    describe(`Register as a Mentor`, () => {
        
    });
});