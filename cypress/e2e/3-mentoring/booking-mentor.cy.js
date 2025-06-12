import { Faker, id_ID } from "@faker-js/faker";

describe(`Booking 1 on 1 Mentoring`, () => {
    const faker = new Faker({ locale: [id_ID] });
    const base_url = Cypress.env('base_url');
    let lang = Cypress.env('language') || 'idn';
    let input, dataTrainee, userJob = {};

    beforeEach(() => {
        cy.clearAllCookies();
        cy.clearAllLocalStorage();
        
        cy.fixture('master-user/trainee/trainee_account').then((data) => {
            dataTrainee = data;
        }).then(() => cy.fixture("label_translation"))
          .then(data => input = data)
          .then(() => cy.visit(`${base_url}`))
          .then(() => cy.getLang())
          .then((resLang) => {
            lang = resLang === 'id' ? 'idn' : 'en';
            cy.log(`Lang: ${lang}`);
          })  
    });

    it('Login as Trainee and Booking Mentor', () => {
        cy.loginTrainee(input[lang],dataTrainee.username,dataTrainee.password);
        cy.xpath(`//a[text()="Mentoring"]`).should('be.visible').click({force:true});
        cy.url().should('include','/mentoring');
        cy.xpath(`//div[@class="flex border-b border-b-neutral-15"]/a[1]`).click();
        cy.xpath(`//div[@class="swiper-wrapper"]/div[8]`).click({ multiple: true });
        cy.wait(2000)
        cy.xpath(`//div[@class="mt-4 grid grid-cols-1 gap-y-4 lg:mt-6 lg:grid-cols-4 lg:gap-x-[22px] lg:gap-y-5"]/a//div[text()="Bisa Request"]`)
            .should('be.visible')
            .and('have.length.greaterThan', 0)
            .then(($el) => {
                const total = $el.length;
                const randomNumber = Math.floor(Math.random() * total) + 1;

                cy.xpath(`//div[@class="mt-4 grid grid-cols-1 gap-y-4 lg:mt-6 lg:grid-cols-4 lg:gap-x-[22px] lg:gap-y-5"]/a[${2}]`)
                    .should('be.visible')
                    .click();
                cy.wait(2000);
                cy.xpath(`//a[contains(text(), "${input[lang].review}")]`).should('be.visible').click({multiple: true});
            });
        cy.xpath(`//button[text()="Ajukan Jadwal"]`).click({force:true})
        cy.xpath(`//button/div[text()="Gali"]`).click();
        cy.xpath(`//button/div[text()="Goal Setting"]`).click();
        cy.xpath(`//button/div[text()="Career Planning"]`).click();
        cy.xpath(`//button/div[text()="Industry Insights"]`).click();
        cy.get(`#mentoring-schedule-topic-request-session-btn`)
            .should('not.be.disabled')
            .and('have.text', input[lang].nextbtn)
            .click({ force: true });
        cy.xpath(`//div[@class="w-full ProposeDateRange_propose_date_range__OxdCX"]//button`).click()
    })
});